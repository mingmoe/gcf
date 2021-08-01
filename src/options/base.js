"use strict"
// MIT LICENSE MADE BY MINGMOE
// PART OF PROJECT GCF

// 导出
export default { gcf_main, output_style_strings, sele_option }

// 导入数据
import * as data from './options.json'

// 输出样式字符串数组
var output_style_strings = [];

// 当前处理进度
var current_pos = 0;

// 结果
var results = "";

// 缺失的设置:
// AccessModifierOffset

import $ from "jquery"

// 主函数
function gcf_main() {
    // 输出创建信息
    output_style_strings.push("---")
    output_style_strings.push("Language: Cpp")
    output_style_strings.push("# Generate from GCF")

    if (data["Options"].length == 0) {
        alert("ERROR:NOT FOUND DATA FILE!")
    }

    // 创建标题
    var title = $("<h1></h1>").addClass("gcf-title").attr("id", "TITLE")

    // 创建描述
    var summary = $("<p></p>").addClass("gcf-text").text("选择一个你喜欢的样式吧!o(*￣▽￣*)ブ").attr("id", "SUMMARY");

    // 创建计数器
    var count = $("<p></p>").addClass("gcf-text").attr("id", "COUNTER")

    // 创建返回按钮
    var back_button = $("<button></button>").addClass("gcf-button").text("上一个选项").css("visibility", "hidden").on("click",back).attr("id", "BACK")

    // 创建容器
    var con = $("<div></div>").addClass("gcf-container").attr("id", "CON")

    // 添加到界面
    $("body").append(title).append(summary).append(count).append(back_button).append(con)

    // 更新界面
    update()
}

// 选择了一个选项
function sele_option() {
    // 获取选项
    var value = $(this).attr("id");

    // 获取键值
    var key = data["Options"][current_pos]["OutName"]

    // 写入
    console.log("OUT:" + key + "=" + value)
    output_style_strings.push(key + "\t\t\t=\t" + value)

    current_pos++;

    // 更新界面
    if (current_pos < data["Options"].length) {
        update()
    }
    else {
        output()
    }
}

// 上一个选项
function back(){
    current_pos--
    output_style_strings.pop()
    update()
}

// 更新界面
function update() {
    var options = data["Options"]

    // 更新标题
    $("#TITLE").text(options[current_pos]["DisName"])

    // 更新进度
    $("#COUNTER").text("目前进度:" + current_pos + "/" + options.length)

    // 更新回退按钮
    if (current_pos != 0) {
        $("#BACK").css("visibility", "visible")
    }
    else{
        $("#BACK").css("visibility", "hidden")
    }

    // 更新容器
    $("#CON").children().remove()

    // 构造选项
    for (var i = 0; i < options[current_pos]["Options"].length; i++) {
        var current = options[current_pos]["Options"][i];

        // 创建选项
        var option = $("<button></button>")
            .addClass("gcf-item")
            .text(current.Summary)
            // 设置ID为选项值
            .attr("id", current.Value)
            .on("click", sele_option)

        // 创建代码块包装:pre
        var option_code_pre = $("<pre></pre>").addClass("gcf-pre");

        // 按行分割代码
        var code_lines = current.Example.split(/\r\n|\r|\n/)

        // 确保示例代码存在
        if(code_lines != null){
            // 按行创建代码块
            for(var j = 0; j < code_lines.length; j++){
                // 强制显示空行
                if(code_lines[j] == "") {
                    code_lines[j] = " "
                }

                var option_code = $("<code></code>").text(code_lines[j]).addClass("gcf-code");
                option_code_pre.append(option_code)
            }

            // 添加示例代码
            option.append(option_code_pre)
        }

        // 添加到容器
        $("#CON").append(option)
    }
}

// 输出
function output() {
    // 更新标题
    $("#TITLE").text("GCF Well Done!")

    var link = $("<a></a>").attr("href", "https://github.com/mingmoe/GCF").text("给作者点个star叭")

    // 更新简介
    $("#SUMMARY").text("你已经完成了所有选项! ").append(link)

    // 删除进度
    $("#COUNTER").remove()

    // 删除回退按钮
    $("#BACK").remove()

    // 删除选项
    $("#CON").children().remove()

    // 获取结果
    results = output_style_strings.join("\n")

    // 添加复制按钮
    var output_button = $("<button></button>").addClass("gcf-button").text("点击复制").attr("id", "OUTPUT").on("click",
    function(){
        // 复制result变量到剪贴板
        var copy_result = document.createElement("textarea")
        copy_result.value = results
        copy_result.setAttribute("readonly", "readonly")
        copy_result.style.position = "absolute"
        copy_result.style.left = "-9999px"
        copy_result.style.top = "-9999px"
        document.body.appendChild(copy_result)
        copy_result.select()
        document.execCommand("copy")
        document.body.removeChild(copy_result)
    })

    // 输出文本
    // 准备pre块
    var output_pre = $("<pre></pre>").addClass("gcf-output").attr("id", "OUTPUT_CODE")
    console.log("TOTAL OUTPUT:");

    // 给pre添加code块
    for(var i = 0; i < output_style_strings.length; i++){
        var output_code = $("<code></code>").text(output_style_strings[i])
        output_pre.append(output_code)

        console.log(output_style_strings[i])
    }

    // 更新
    $("body").append(output_button).append(output_pre)
}
