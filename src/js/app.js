import 'jquery.global.js';
import page from 'page';
import forms from 'forms';

import contacts from 'ymap';

import mainPage from 'index.page';


const jQuery = require("jquery");
window.jQuery = window.$ = jQuery;
jQuery.fn.load = function (callback) { $(window).on("load", callback) };


let app = {


    scrollToOffset: 200, // оффсет при скролле до элемента
    scrollToSpeed: 500, // скорость скролла

    init: function () {
        // read config
        if (typeof appConfig === 'object') {
            Object.keys(appConfig).forEach(key => {
                if (Object.prototype.hasOwnProperty.call(app, key)) {
                    app[key] = appConfig[key];
                }
            });
        }

        app.currentID = 0;

        // Init page
        this.page = page;
        this.page.init.call(this);

        this.forms = forms;
        this.forms.init.call(this);

        this.contacts = contacts;
        this.contacts.init.call(this);


        // Init page

        this.mainPage = mainPage;
        this.mainPage.init.call(this);

        //window.jQuery = $;
        window.app = app;

        app.document.ready(() => {


        });




        app.window.on('load', () => {


        });

        // this.document.on(app.resizeEventName, () => {
        // });

    },

};
app.init();
