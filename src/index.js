"use strict"
// MIT LICENSE MADE BY MINGMOE
// PART OF PROJECT GCF
// 主要入口文件

import $ from "jquery"
import './main.scss';
import main from './options/base.js';

// 点击删除则进入生成阶段
var start = $('#start-btn');
start.on('click', function () {

    $(".gcf-title").remove()
    $(".gcf-text").remove()
    $("#start-btn").remove()

    console.log("STRATING")

    main.gcf_main()
});





