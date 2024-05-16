import * as express from 'express';
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import passport from "passport";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || '',
    //issuer: 'admin.utms.lk',
    //audience: 'utms.lk',
}

export default async function passportStartup(app: express.Application) {
    await app.use(passport.initialize());
    await app.use(passport.session());

    await passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        // const user = await User.findById(jwt_payload.user_id).exec();
        if (jwt_payload) {
            return done(null, jwt_payload);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    }));
}
