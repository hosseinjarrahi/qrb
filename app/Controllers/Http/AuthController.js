'use strict'

const Kavenegar = require('kavenegar');
const randomstring = require("randomstring");
const moment = use('moment');
const User = use('App/Models/User');
const Coffe = use('App/Models/Coffe');
const Hash = use('Hash')

class AuthController {

  async login({request, response, auth}) {
    const {phone, password, link} = request.all()
    let user
    let coffe

    if (link) {
      coffe = await Coffe.query().where({link}).first()
    }

    if (link && !coffe) {
      return response.status(400)
    }

    if (link) {
      user = await User.query().where({coffe_id: coffe.id}).where({phone}).first();
    } else {
      user = await User.query().where({phone}).first();
    }

    if (!user) {
      return response.status(400).json({message: 'چنین کاربری وجود ندارد'})
    }

    if (!await Hash.verify(password, user.password)) {
      return response.status(400).json({message: 'رمز وارد شده اشتباه است'})
    }

    return auth.generate(user)
  }

  async register({request, response}) {
    let user = null
    let link = request.post().link
    let coffe = null;

    if (link) {
      coffe = await Coffe.query().where({link}).first()
    }

    try {
      if (coffe)
        user = await User.create({...request.only(['name', 'phone', 'password']), coffe_id: coffe.id});
      else
        user = await User.create({...request.only(['name', 'phone', 'password'])});
      let code;
      if (user)
        code = await this.sendCode(request.post().phone);
      user.active_code = code
      user.save();
    } catch (e) {
      user = await User.query().where({phone: request.post().phone}).where({phone_verified: false}).first();
      if (!user && e.errno === 1062) {
        return response.status(400).json({message: 'این شماره تلفن قبلا ثبت شده است.'});
      }
      if (moment().subtract(2, 'minutes').isBefore(user.updated_at)) {
        return response.status(400).json({message: 'پس از دو دقیقه دوباره امتحان کنید.'});
      } else {
        let code = await this.sendCode(request.post().phone);
        user.fill({...request.only(['name', 'phone', 'password']), active_code: code});
        await user.save();
      }
    }

    return response.status(200).json({message: 'کد تایید برای شما ارسال شد.', user});
  }

  async user({request, response, auth}) {
    return {user: await auth.getUser()}
  }

  async logout({request, response, auth}) {
    await auth.logout()

    return {message: 'با موفقیت خارج شدید'}
  }

  async sendCode(phone) {
    let code = Math.floor(Math.random() * 9999) + 10000;
    let message = "کد تایید باشگاه مشتریان : ";
    message += code;

    let api = Kavenegar.KavenegarApi({
      apikey: '4778426C5839394D6562307A64635567314E6C6F426638614478732F6D56696C4B7336626E7857594F6E413D'
    });

    api.VerifyLookup({receptor: phone, token: code, template: 'verifyMenu'}, (response, status) => {
      User.query().where('phone', phone).update({active_code: code});
    });

    return code
  }

  async resendCode({request, response}) {
    let user = await User.query()
      .where({phone: request.post().phone})
      .where('updated_at', '<=', moment().subtract(2, 'minutes').format('YYYY-MM-DD HH:mm:ss'))
      .first();

    if (!user) {
      return response.status(400).json({message: 'تنها هر دو دقیقه امکان ارسال پیامک وجود دارد'})
    }

    user.active_code = await this.sendCode(user.phone)
    await user.save()

    return response.status(200).json({message: 'با موفقیت ارسال شد.'});
  }

  async verification({request, response}) {
    let user = await User.query()
      .where({phone: request.post().phone})
      .where({active_code: request.post().code})
      .where('updated_at', '>', moment().subtract(2, 'minutes').format('YYYY-MM-DD HH:mm:ss'))
      .first();

    if (!user) {
      return response.status(400).json({message: 'کد وارد شده اشتباه است.'})
    }

    if (!request.post().wantsReset) {
      user.phone_verified = true
      user.save()
      return response.status(200).json({message: 'با موفقیت ثبت نام شدید.'});
    }

    let reset_token = await randomstring.generate(15);
    user.reset_token = reset_token;
    await user.save()

    return response.status(200).json({message: 'تایید شد.', reset_token, user});
  }

  async resetPassword({request, response}) {
    let user = await User.query().where({phone: request.post().phone}).first();

    if (!user) {
      return response.status(500).json({message: 'کاربری با این اطلاعات یافت نشد.'});
    }

    if (!user.isVerified()) {
      return response.status(400).json({message: 'از بخش ثبت نام اقدام نمایید.'});
    }

    if (moment().subtract(2, 'minutes').isBefore(user.updated_at)) {
      return response.status(400).json({message: 'پس از دو دقیقه دوباره امتحان کنید.'});
    }

    user.active_code = await this.sendCode(request.post().phone);
    user.save();

    return response.status(200).json({message: 'کد با موفقیت ارسال شد.'});
  }

  async changePassword({request, response}) {
    let user = await User.query().where({phone: request.post().phone}).where({reset_token: request.post().reset_token}).first();

    if (!user) {
      return response.status(500).json({message: 'مشکلی رخ داده است.'});
    }

    user.password = request.post().password
    user.save()

    return response.status(200).json({message: 'رمز شما با موفقیت تغییر یافت.'});
  }

}

module.exports = AuthController
