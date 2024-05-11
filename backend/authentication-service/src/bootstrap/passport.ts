import * as express from 'express';
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import passport from "passport";
import User from "../schemas/User.schema";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET ?? '',
    // issuer: 'it21169908@my.sliit.lk',
    // audience: 'https://www.sliit.lk/',
}

export default async function startupPassport(app: express.Application) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        const user = await User.findById(jwt_payload.user_id).exec();
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}
