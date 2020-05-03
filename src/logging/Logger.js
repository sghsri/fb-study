
import config from '../config';
import firebase from 'firebase';
import app from "../util/firebase.js";

class Logger {

    static log_action(type, action, object = null, value = null) {
        let user_id = localStorage.getItem('user_id');
        let ip_address = localStorage.getItem('ip_address');
        let date = new Date();
        let time = date.toString();
        let iso = date.toISOString();
        iso = iso.substring(0, iso.indexOf('.'));


        let log_obj = {
            "user": user_id,
            "ip_address": ip_address,
            "time": time,
            'type': type,
            "action": action,
            "value": value,
            "object": object
        };

        firebase.database().ref(`data/${user_id}__${iso}`).set(log_obj);
    }
}

export default Logger;