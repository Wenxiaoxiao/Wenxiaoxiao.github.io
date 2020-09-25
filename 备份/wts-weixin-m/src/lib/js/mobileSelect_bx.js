/*!
 * mobileSelect.js
 * (c) 2017-present onlyhom
 * Released under the MIT License.
 */

(function () {
	//构造器
	function MobileSelect(config) {
		this.mobileSelect;
		//数据源
		this.wheelsData = config.wheels;
		//数据类型(1点击单选,2点击多选,3滚动单选,4滚动多选,)
		//this.type = config.type;
		//是否显示下一步按钮
		this.startY;
		this.moveEndY;

		this.moveY;
		this.oldMoveY;
		this.cascadeJsonData = [];
		this.displayJson = [];
		this.cascade = false;
		this.offset = 0;
		this.init(config);
	}
	MobileSelect.prototype = {
		constructor: MobileSelect,
		init: function (config) {
			var _this = this;
			_this.keyMap = config.keyMap ? config.keyMap : { id: 'value', value: 'text', children: 'children' };
			//初始化位置
			_this.initPosition = [];
			_this.mobileSelect = $(".mobileSelect");
			//根据type跟数据源渲染对应的弹框数据
			_this.renderWheels(_this.wheelsData);
			//选择列表
			_this.slider = $('.selectContainer-box');
			if (_this.type == 3 || _this.type == 4) {
				_this.slider = $('.selectContainer');
			} else if (_this.type == 5) {
				_this.slider = $('.selectContainer_select');
			}
			_this.panel = $('.panel');
			//li的高度
			_this.liHeight = _this.slider.find('li').height();
			//阴影
			_this.grayLayer = _this.mobileSelect.find('.grayLayer');

			//初始化创建第0个tab
			_this.ids = 0;


			_this.checkCascade();
			if (_this.cascade) {
				_this.initCascade();
			}

			_this.setCurDistance(_this.initPosition);


			//修正列数
			_this.fixRowStyle();

			//修正选中框位置
			_this.SelectTheBox();

			//修正显示样式
			_this.displayStyle(0);
			//绑定鼠标手势事件
			_this.addListenerAll();
		},
		calcDistance: function (index) {
			return 2 * this.liHeight - index * this.liHeight;
		},

		SelectTheBox: function () {
			for (var i = 0; i < $(".panel .fixWidth").length; i++) {
				if (!$(".panel .fixWidth").eq(i).find(".wheelTitle span").length) {
					$(".panel .fixWidth").eq(i).find(".wheels").css("max-height", "200px");
					$(".panel .fixWidth").eq(i).find(".selectLine").css("top", "80px");
					$(".panel .fixWidth").eq(i).find(".shadowMask").css("top", "0px");
				} else {
					$(".panel .fixWidth").eq(i).find(".wheels").css("max-height", "240px");
				}
			}
		},

		setCurDistance: function (indexArr) {
			var _this = this;
			var temp = [];
			for (var i = 0; i < _this.panel.find(".fixWidth").length; i++) {
				var obj = {};
				obj.data = [];
				for (var j = 0; j < _this.panel.find(".fixWidth").eq(i).find(".wheel").length; j++) {
					obj.data.push(_this.calcDistance(indexArr[i].data[j]));
					_this.movePosition(this.panel.find(".fixWidth").eq(i).find(".selectContainer").eq(j), obj.data[j]);
				}
				temp.push(obj);

			}
			_this.curDistance = temp;
		},
		movePosition: function (theSlider, distance) {
			theSlider.css('webkitTransform', 'translate3d(0,' + distance + 'px, 0');
			theSlider.css('transform', 'translate3d(0,' + distance + 'px, 0');
		},

		fixPosition: function (distance) {
			return -(this.getIndex(distance) - 2) * this.liHeight;
		},


		updateCurDistance: function (theSlider, i, j) {
			if (theSlider.style.transform) {
				this.curDistance[i].data[j] = parseInt(theSlider.style.transform.split(',')[1]);
			} else {
				this.curDistance[i].data[j] = parseInt(theSlider.style.webkitTransform.split(',')[1]);
			}
		},

		getIndex: function (distance) {
			return Math.round((2 * this.liHeight - distance) / this.liHeight);
		},

		//根据数据创建弹框
		renderWheels: function (wheelsData) {
			//清空上一次的数据渲染
			$(".content .btnBar .fixWidth").html("");
			$(".content .panel").html("");
			var _this = this;
			_this.type = wheelsData[0].typeCode || 4;
			var type = _this.type;
			//根据type渲染对应的数据类型
			if (type == 1 || type == 2 || type == 3) {
				_this.displayNodeType(type, wheelsData)
			} else if (type == 4) {
				_this.displayNodeType_bx(type, wheelsData)
			} else {
				_this.displayNodeType_input(type, wheelsData)
			}
		},
		//渲染type为1,2的数据
		displayNodeType: function (type, wheelsData) {
			var _this = this;
			var fixWidth = $(".content .btnBar .fixWidth");
			var panel = $(".content .panel");
			$(".mobileSelect").attr("dType", type)
			var selectDataItem = [];
			if (!selectData[index]) {
				selectData[index] = selectDataItem;
			}
			for (var i = 0; i < wheelsData.length; i++) {
				var selsectDataObj = { data: [] };
				selectDataItem.push(selsectDataObj);
				var btnBarItem = wheelsData[i];
				if (btnBarItem.name.length > 0) {
					fixWidth.append('<div class="fixWidthBar"><span>' + btnBarItem.name + '</span></div>');
				}
				if (btnBarItem.data && btnBarItem.data.length > 0) {
					var div = $("<div class='fixWidth fixWidth_box'>");
					if (type == 3) {
						div = $("<div class='fixWidth fixWidth_select'>");
					}
					div.attr("index", i);
					var wheels = $('<div class="wheels"></div>');
					var wheelTitle = $('<div class="wheelTitle"></div>');
					panel.append(div);
					div.append(wheels);
					wheels.append(wheelTitle);
					for (var j = 0; j < btnBarItem.data.length; j++) {
						var panelItem = btnBarItem.data[j];
						var wheel = $("<div class='wheel-box'></div>");
						var selectContainer = $("<ul class='selectContainer-box' types=" + btnBarItem.type + "></ul>");
						if (type == 3) {
							wheel = $("<div class='wheel'></div>");
							selectContainer = $("<ul class='selectContainer'></ul>");
						}
						wheel.attr("index", j);
						wheels.append(wheel);
						if (panelItem.name) {
							var span = $("<span></span>");
							span.html(panelItem.name);
							wheelTitle.append(span);
						}
						wheel.append(selectContainer);
						for (var k = 0; k < panelItem.data.length; k++) {
							var wheelItem = panelItem.data[k];
							var li = $("<li></li>");
							li.html(wheelItem);
							selectContainer.append(li);
						}
					}
					if (type == 3) {
						wheels.append('<div class="selectLine"></div><div class="shadowMask"></div>');
					}
					//判断是否显示确定按钮
					if (btnBarItem.hasBtn) {
						if (index == jsonData.length - 1) {
							if(wheelsData.length>1){
								div.append("<div class='fixWidth_btn'>下一步</div>");
							}else{
								div.append("<div class='fixWidth_btn'>提交</div>");
							}
						} else {
							div.append("<div class='fixWidth_btn'>下一步</div>");
						}
					}
				}
			}

			//修改对应选中样式
			if (type == 1 || type == 2) {
				for (var i = 0; i < selectData[index].length; i++) {
					var item = selectData[index][i];
					for (var l = 0; l < item.data.length; l++) {
						var text = item.data[l];
						for (var j = 0; j < $(".panel .fixWidth").eq(i).find(".selectContainer-box li").length; j++) {
							if (text && $(".panel .fixWidth").eq(i).find(".selectContainer-box li").eq(j).html() == text) {
								$(".panel .fixWidth").eq(i).find(".selectContainer-box li").eq(j).addClass("active");
							}
						}
					}

				}

				for (var i = 0; i < selectData[index].length; i++) {
					var obj = {};
					obj.index = i;
					obj.data = [];
					for (var j = 0; j < $(".panel .fixWidth").eq(i).find(".wheel").length; j++) {
						var ind = j * 1 + 1;
						obj.data.push(ind);
					}
					_this.initPosition.push(obj);

				}
			} else if (type == 3) {
				for (var i = 0; i < selectData[index].length; i++) {
					var obj = {};
					obj.index = i;
					obj.data = [];
					var item = selectData[index][i];
					if (item.data.length > 0) {
						for (var l = 0; l < item.data.length; l++) {
							var text = item.data[l];
							for (var j = 0; j < $(".panel .fixWidth").eq(i).find(".selectContainer").length; j++) {
								for (var k = 0; k < $(".panel .fixWidth").eq(i).find(".selectContainer").eq(j).find("li").length; k++) {
									if (text && $(".panel .fixWidth").eq(i).find(".selectContainer").eq(j).find("li").eq(k).html() == text) {
										obj.data[j] = k;
									}
								}
							}
						}
						_this.initPosition.push(obj);
					} else {
						for (var j = 0; j < $(".panel .fixWidth").eq(i).find(".wheel").length; j++) {
							var ind = j * 1 + 1;
							obj.data.push(ind);
						}
						_this.initPosition.push(obj);
					}

				}
			}

		},
		//渲染type为4的数据
		displayNodeType_bx: function (type, wheelsData) {
			var _this = this;
			var fixWidth = $(".content .btnBar .fixWidth");
			var panel = $(".content .panel");
			$(".mobileSelect").attr("dType", type)
			var selectDataItem = [];
			if (!selectData[index]) {
				selectData[index] = selectDataItem;
			}
			for (var i = 0; i < wheelsData.length; i++) {
				var selsectDataObj = { data: [] };
				selectDataItem.push(selsectDataObj);
				var btnBarItem = wheelsData[i];
				if (btnBarItem.name.length > 0) {
					fixWidth.append('<div class="fixWidthBar"><span>' + btnBarItem.name + '</span></div>');
				}


				if (btnBarItem.data && btnBarItem.data.length > 0) {
					var div = $("<div class='fixWidth fixWidth_select'>");
					div.attr("index", i);
					var wheels = $('<div class="wheels"></div>');
					var wheelTitle = $('<div class="wheelTitle"></div>');
					panel.append(div);
					div.append(wheels);
					wheels.append(wheelTitle);
					var wheel = $("<div class='wheel'></div>");
					var selectContainer = $("<ul class='selectContainer'></ul>");
					wheel.attr("index", j);
					wheels.append(wheel);
					wheel.append(selectContainer);
					for (var j = 0; j < btnBarItem.data.length; j++) {
						var li = $("<li></li>");
						li.html(btnBarItem.data[j].text);
						selectContainer.append(li);
					}
					wheels.append('<div class="selectLine"></div><div class="shadowMask"></div>');
					//判断是否显示确定按钮
					if (btnBarItem.hasBtn) {
						div.append("<div class='fixWidth_btn'>下一步</div>");
					}
				}
			}

			for (var i = 0; i < selectData[index].length; i++) {
				var obj = {};
				obj.index = i;
				obj.data = [];
				for (var j = 0; j < $(".panel .fixWidth").eq(i).find(".wheel").length; j++) {
					var ind = j * 1 + 1;
					obj.data.push(ind);
				}
				_this.initPosition.push(obj);

			}

		},

		//渲染type为5的数据
		displayNodeType_input: function (type, wheelsData) {
			var _this = this;
			var fixWidth = $(".content .btnBar .fixWidth");
			var panel = $(".content .panel");
			$(".mobileSelect").attr("dType", type)
			var selectDataItem = [];
			if (!selectData[index]) {
				selectData[index] = selectDataItem;
			}
			for (var i = 0; i < wheelsData.length; i++) {
				var selsectDataObj = { data: [] };
				selectDataItem.push(selsectDataObj);
				var btnBarItem = wheelsData[i];
				if (btnBarItem.name.length > 0) {
					fixWidth.append('<div class="fixWidthBar"><span>' + btnBarItem.name + '</span></div>');
				}
				if (btnBarItem.data && btnBarItem.data.length > 0) {
					var div = $("<div class='fixWidth fixWidth_input'>");
					div.attr("index", i);
					var wheels = $('<div class="wheels"></div>');
					var wheelTitle = $('<div class="wheelTitle"></div>');
					panel.append(div);
					div.append(wheels);
					wheels.append(wheelTitle);
					for (var j = 0; j < btnBarItem.data.length; j++) {
						var panelItem = btnBarItem.data[j];
						var wheel = $("<div class='wheel_input'></div>");
						var selectContainer = $("<ul class='selectContainer_input' types=" + btnBarItem.type + "></ul>");
						wheel.attr("index", j);
						wheels.append(wheel);
						if (panelItem.name) {
							var span = $("<span></span>");
							span.html(panelItem.name);
							wheelTitle.append(span);
						}
						wheel.append(selectContainer);
						for (var k = 0; k < panelItem.data.length; k++) {
							var wheelItem = panelItem.data[k];
							var input_dev = $("<div class='input_div'>");
							// if(index== jsonData.length-1){
							// 	input_dev.html("<span class='input_dev_span'>" + wheelItem.title + ":</span><input type='number' placeholder='请输入电话号码' name=" + wheelItem.name + " />")
							// }else{
							// 	input_dev.html("<span class='input_dev_span'>" + wheelItem.title + ":</span><input type='text' placeholder='请输入您的称呼' name=" + wheelItem.name + " />")
							// }

							input_dev.html("<span class='input_dev_span'>" + wheelItem.title + ":</span><input type='text' maxlength='10' placeholder='请输入您的称呼' name=" + wheelItem.name + " />")
							
							selectContainer.append(input_dev);
						}
					}

					//判断是否显示确定按钮
					if (btnBarItem.hasBtn) {
						div.append("<div class='fixWidth_btn'>下一步</div>");
					}
				}
			}

			//修改对应选中样式
			for (var i = 0; i < selectData[index].length; i++) {
				var obj = {};
				obj.index = i;
				obj.data = [];
				for (var j = 0; j < $(".panel .fixWidth").eq(i).find(".wheel").length; j++) {
					var ind = j * 1 + 1;
					obj.data.push(ind);
				}
				_this.initPosition.push(obj);

			}
			
			for (var i = 0; i < selectData[index].length; i++) {
					var item = selectData[index][i];
					for (var l = 0; l < item.data.length; l++) {
						var text = item.data[l];
						for (var j = 0; j < $(".panel .fixWidth").eq(i).find(".selectContainer_input input").length; j++) {
							$(".panel .fixWidth").eq(i).find(".selectContainer_input input").eq(j).val(text);
						}
					}

				}

		},
		//修正列的样式
		fixRowStyle: function () {
			$(".fixWidthBar").width(100 / $(".fixWidthBar").length + '%');
			for (var i = 0; i < $(".panel .fixWidth").length; i++) {
				var width = (100 / $(".panel .fixWidth").eq(i).find(".wheel").length).toFixed(2);
				for (var j = 0; j < $(".panel .fixWidth").eq(i).find(".wheel").length; j++) {
					$(".panel .fixWidth").eq(i).find(".wheel").eq(j).width(width + '%');
					$(".panel .fixWidth").eq(i).find(".wheelTitle span").eq(j).width(width + '%');
				}

			}
		},

		//修正样式
		displayStyle: function (index) {
			for (var i = 0; i < $(".mobileSelect .content .fixWidth .fixWidthBar").length; i++) {
				$(".mobileSelect .content .fixWidth .fixWidthBar").eq(i).find("span").removeClass("active");
				$(".panel .fixWidth").eq(i).hide();
				if (index == i) {
					$(".mobileSelect .content .fixWidth .fixWidthBar").eq(i).find("span").addClass("active");
					$(".panel .fixWidth").eq(i).show();
				}
			}
		},

		//显示隐藏
		show: function () {
			this.mobileSelect.addClass('mobileSelect-show');
		},

		hide: function () {
			this.mobileSelect.removeClass('mobileSelect-show');
		},

		checkCascade: function () {
			var _this = this;
			if (_this.type == 4) {
				var arr = [];
				for (var i = 0; i < _this.wheelsData.length; i++) {
					var node = _this.wheelsData[i].data;
					var arr1 = [];
					for (var j = 0; j < node.length; j++) {
						if (_this.keyMap.children in node[j] && node[j][_this.keyMap.children].length > 0) {
							_this.cascade = true;
							arr1.push(_this.wheelsData[i].data[j]);
						}
					}
					arr.push(arr1);
				}
				_this.cascadeJsonData = arr;
			} else {
				_this.cascade = false;
			}
		},

		generateArrData: function (targetArr) {
			var tempArr = [];
			var keyMap_id = this.keyMap.id;
			var keyMap_value = this.keyMap.value;
			for (var i = 0; i < targetArr.length; i++) {
				var tempObj = {};
				tempObj[keyMap_id] = targetArr[i][this.keyMap.id];
				tempObj[keyMap_value] = targetArr[i][this.keyMap.value];
				tempArr.push(tempObj);
			}
			return tempArr;
		},

		initCascade: function () {
			var _this = this;
			for (var i = 0; i < _this.cascadeJsonData.length; i++) {
				(function (i) {
					var displayJson = [];
					displayJsonData[i] = displayJson;
					displayJsonData[i].push(_this.generateArrData(_this.cascadeJsonData[i]));
					if (selectData[index] && selectData[index][i].data && selectData[index][i].data.length && selectData[index][i].data[0].id) {
						for (var j = 0; j < _this.cascadeJsonData[i].length; j++) {
							if (_this.cascadeJsonData[i][j].value == selectData[index][i].data[0].id) {
								_this.checkArrDeep(i, _this.cascadeJsonData[i][j]);
								break
							}
						}
					} else {
						_this.checkArrDeep(i, _this.cascadeJsonData[i][0]);
					}

					_this.reRenderWheels(i);
				})(i)
			}
		},

		initCheckArrDeep: function (parent) {
			var _this = this;
			if (parent) {
				if (_this.keyMap.children in parent && parent[_this.keyMap.children].length > 0) {
					_this.displayJson.push(_this.generateArrData(parent[_this.keyMap.children]));
					_this.initDeepCount++;
					var nextNode = parent[_this.keyMap.children][_this.initPosition[_this.initDeepCount]];
					if (nextNode) {
						_this.initCheckArrDeep(nextNode);
					} else {
						_this.checkArrDeep(parent[_this.keyMap.children][0]);
					}
				}
			}
		},


		getIndexArr: function () {
			var _this = this;
			var temp = [];
			for (var i = 0; i < _this.curDistance.length; i++) {
				var obj = { data: [] };
				for (var j = 0; j < _this.curDistance[i].data.length; j++) {
					obj.data.push(_this.getIndex(_this.curDistance[i].data[j]));
				}
				temp.push(obj);
			}
			return temp;
		},

		checkArrDeep: function (i, parent) {
			//检测子节点深度  修改 displayJson
			var _this = this;
			if (parent) {
				if (_this.keyMap.children in parent && parent[_this.keyMap.children].length > 0) {
					displayJsonData[i].push(_this.generateArrData(parent[_this.keyMap.children])); //生成子节点数组
					_this.checkArrDeep(i, parent[_this.keyMap.children][0]);//检测下一个子节点
				}
			}
		},


		reRenderWheels: function (ids) {
			var _this = this;
			//删除多余的wheel
			if ($(".fixWidth_select").eq(ids).find(".wheel").length > displayJsonData[ids].length) {
				var count = $(".fixWidth_select").eq(ids).find(".wheel").length - displayJsonData[ids].length;
				for (var i = 0; i < count; i++) {
					$(".fixWidth_select").eq(ids).find(".wheels").remove($(".fixWidth_select").eq(ids).find(".wheel").eq($(".fixWidth_select").eq(ids).find(".wheel").length - 1));
				}
			}
			for (var i = 0; i < displayJsonData[ids].length; i++) {
				//列
				(function (i) {
					var tempHTML = '';
					if ($(".fixWidth_select").eq(ids).find(".wheel").eq(i).length) {
						$(".fixWidth_select").eq(ids).find(".wheel").eq(i).attr("index", i);
						//console.log('插入Li');
						for (var j = 0; j < displayJsonData[ids][i].length; j++) {
							//行
							tempHTML += '<li data-id="' + displayJsonData[ids][i][j][_this.keyMap.id] + '">' + displayJsonData[ids][i][j][_this.keyMap.value] + '</li>';
						}
						$(".fixWidth_select").eq(ids).find(".selectContainer").eq(i).html(tempHTML)

					} else {
						var tempWheel = $("<div>");
						tempWheel.addClass("wheel");
						tempWheel.attr("index", i);
						tempHTML = '<ul class="selectContainer">';
						for (var j = 0; j < displayJsonData[ids][i].length; j++) {
							//行
							tempHTML += '<li data-id="' + displayJsonData[ids][i][j][_this.keyMap.id] + '">' + displayJsonData[ids][i][j][_this.keyMap.value] + '</li>';
						}
						tempHTML += '</ul>';
						tempWheel.html(tempHTML);
						$(".fixWidth_select").eq(ids).find(".wheels").append(tempWheel);
					}
				})(i);
			}



			//修正滚动条的位置
			var item = selectData[index][ids];
			if (item.data.length && item.data.length == $(".fixWidth_select").eq(ids).find(".selectContainer").length) {
				for (var l = 0; l < item.data.length; l++) {
					var text = item.data[l].value;
					for (var j = 0; j < $(".panel .fixWidth").eq(ids).find(".selectContainer").length; j++) {
						for (var k = 0; k < $(".panel .fixWidth").eq(ids).find(".selectContainer").eq(j).find("li").length; k++) {
							if (text && $(".panel .fixWidth").eq(ids).find(".selectContainer").eq(j).find("li").eq(k).html() == text) {
								_this.initPosition[ids].data[j] = k;
							}
						}
					}
				}
			} else {
				_this.initPosition = [];
				for (var j = 0; j < _this.panel.find(".fixWidth").length; j++) {
					var obj = {};
					obj.index = j;
					obj.data = [];
					for (var k = 0; k < _this.panel.find(".fixWidth").eq(j).find(".wheel").length; k++) {
						var ind = 0;
						obj.data.push(ind);
					}
					_this.initPosition.push(obj);
				}
			}

			//绑定鼠标手势事件
			_this.addListenerAll();
		},

		//绑定事件
		addListenerAll: function () {
			var _this = this;
			//选项卡的点击事件
			$(".mobileSelect .content .fixWidth .fixWidthBar").unbind("click");
			$(".mobileSelect .content .fixWidth .fixWidthBar").click(function () {
				var index = $(this).index(".mobileSelect .content .fixWidth .fixWidthBar");
				_this.displayStyle(index);
			})


			//选择项的点击事件
			$(".selectContainer-box li").unbind("click");
			$(".selectContainer-box li").click(function () {
				_this.clearSelectData();
				var ppIdx = $(this).parents(".fixWidth").attr("index");
				var pIdx = $(this).parents(".wheel-box").attr("index");
				if (_this.type == 1) {
					//单选
					$(".fixWidth").eq(ppIdx).find(".selectContainer-box").eq(pIdx).find("li").removeClass("active");
					$(this).addClass("active");
					selectData[index][ppIdx].data[pIdx] = $(this).html();
					$(".customization_item").eq(index).find(".customization_item_answer").remove();
					for (var i = 0; i < $(".panel .fixWidth").length; i++) {
						for (var j = 0; j < $(".panel .fixWidth").eq(i).find(".selectContainer-box").length; j++) {
							if (selectData[index][i].data[j]) {
								var div = $('<div class="customization_item_answer">');
								var divHtml = '<span class="customization_item_answer_title">' + $(".fixWidthBar span").eq(i).html() + ':</span><span class="customization_item_answer_info">' + selectData[index][i].data[j] + '</span>';
								div.html(divHtml);
								$(".customization_item").eq(index).append(div);
							}
						}
					}

					setTimeout(function () {
						_this.scrollTo();
					}, 100)

					var obIdx = -1;
					var obFlg = false;
					for (var i = 0; i < selectData[index].length; i++) {
						if (selectData[index][i] && selectData[index][i].data.length == 0) {
							obIdx = i;
							obFlg = true;
							break
						}
					}
					if (obFlg) {
						_this.displayStyle(obIdx);
					} else {
						mobileSelect1.hide();
						index++;
						setTimeout(function () {
							showQuestion();
							initChoose(jsonData[index]);
							mobileSelect1.show();
						}, 100)


					}

				} else {
					//多选
					//判断是否已经有四个
					if ($(this).hasClass("active")) {
						$(this).removeClass("active");
						var idxs = selectData[index][ppIdx].data.remove($(this).html());
					} else {
						if (index == 3 && $(this).parent().find(".active").length == maxLength) {
								return $.layerMsg("当前最多选择"+maxLength+"个被保险人<br>如需修改请取消当前选中!");
						} else {
							$(this).addClass("active");
							selectData[index][ppIdx].data.push($(this).html());
						}
					}

					$(".customization_item").eq(index).find(".customization_item_answer").remove();
					for (var i = 0; i < selectData[index].length; i++) {
						var div = $('<div class="customization_item_answer">');
						div.html('<span class="customization_item_answer_title">' + $(".fixWidthBar span").eq(i).html() + ':</span>');
						for (var j = 0; j < selectData[index][i].data.length; j++) {
							if (selectData[index][i].data[j]) {
								var span = $('<span class="customization_item_answer_info">');
								span.html(selectData[index][i].data[j]);
								div.append(span);
							}
						}
						$(".customization_item").eq(index).append(div);
					}

					setTimeout(function () {
						_this.scrollTo();
					}, 100)

				}
			})

			$(".fixWidth_box").find(".fixWidth_btn").unbind("click");
			$(".fixWidth_box").find(".fixWidth_btn").click(function () {
				_this.clearSelectData();
				var li_flag = true;
				for (var i = 0; i < $(this).parents(".fixWidth_box").find("li").length; i++) {
					if ($(this).parents(".fixWidth_box").find("li").eq(i).hasClass("active")) {
						li_flag = false;
						break;
					}
				}
				if (li_flag) {
					return $.layerMsg("请选择对应的选择项");
				}
				//判断还有没有选择项
				var obIdx = -1;
				var obFlg = false;
				for (var i = 0; i < selectData[index].length; i++) {
					if (selectData[index][i] && selectData[index][i].data.length == 0) {
						obIdx = i;
						obFlg = true;
						break
					}
				}
				if (obFlg) {
					_this.displayStyle(obIdx);
					if (index == jsonData.length - 1 && obIdx ==  selectData[index].length-1) {
						$(".fixWidth_btn").html("提交")
					}
				} else {
					if (index == jsonData.length - 1) {
						// 提交数据拼接
						var submit = {};
						//订单id
						submit.orderId = orderId;
						//性别
						if (selectData[0][0].data[0] == "男") {
							submit.consumeSex = 1;
						} else {
							submit.consumeSex = 2;
						}


						//家庭收入
						submit.income = selectData[2][0].data[0];

						//投保人信息
						submit.content = [];
						for (var i = 0; i < selectData[3][0].data.length; i++) {
							var item = selectData[3][0].data[i];
							var obj = {};
							//关系
							if (item == "本人") {
								obj.customizeRelationship = 1;
							} else if (item == "配偶") {
								obj.customizeRelationship = 4;
							} else if (item == "父亲") {
								obj.customizeRelationship = 5;
							} else if (item == "母亲") {
								obj.customizeRelationship = 6;
							} else if (item == "子女") {
								obj.customizeRelationship = 3;
							} else if (item == "配偶父亲") {
								obj.customizeRelationship = 7;
							} else if (item == "配偶母亲") {
								obj.customizeRelationship = 8;
							}else if (item == "儿子") {
								obj.customizeRelationship = 9;
							}else if (item == "女儿") {
								obj.customizeRelationship = 10;
							}

							//地址
							obj.homeAddress = selectData[1][0].data[0].value + selectData[1][0].data[1].value;
							obj.addressCode = [];
							for (var j = 0; j < selectData[1][0].data.length; j++) {
								var aobj = {};
								aobj.province = selectData[1][0].data[j].id;
								aobj.value = selectData[1][0].data[j].value;
								obj.addressCode.push(aobj);
							}

							//年龄
							obj.customizeAge = parseInt(selectData[4][i].data[0]);
							// var moth, day;
							// if (parseInt(selectData[4][i].data[1].value) > 10) {
							// 	moth = parseInt(selectData[4][i].data[1].value);
							// } else {
							// 	moth = "0" + parseInt(selectData[4][i].data[1].value);
							// }

							// if (parseInt(selectData[4][i].data[2].value) > 10) {
							// 	day = parseInt(selectData[4][i].data[2].value);
							// } else {
							// 	day = "0" + parseInt(selectData[4][i].data[2].value);
							// }

							// obj.customizeBirthday = parseInt(selectData[4][i].data[0].value) + "-" + moth + "-" + day;

							//有无社保
							if (selectData[5][i].data == "有") {
								obj.socialFlag = 1;
							} else {
								obj.socialFlag = 0;
							}
							//既往病史
							obj.throughoutHistory = selectData[6][i].data;
							//职业
							if (selectData[7][i].data[0] == "室内轻体力（行政、管理人员）") {
								obj.jobType = "001";
							}
							else if (selectData[7][i].data[0] == "室内重体力（程序员）") {
								obj.jobType = "002";
							}
							else if (selectData[7][i].data[0] == "户外简单工作（导游、司机）") {
								obj.jobType = "003";
							}
							else if (selectData[7][i].data[0] == "户外复杂工作（工程师、建筑工人）") {
								obj.jobType = "004";
							}
							else if (selectData[7][i].data[0] == "室内制造业（装修、流水线）") {
								obj.jobType = "005";
							}
							else if (selectData[7][i].data[0] == "家庭主妇") {
								obj.jobType = "006";
							}
							else if (selectData[7][i].data[0] == "其他") {
								obj.jobType = "007";
							}
							else if (selectData[7][i].data[0] == "学生及学龄前儿童") {
								obj.jobType = "008";
							}

							//生活状况
							obj.liveCondition = selectData[8][i].data;
							
							submit.content.push(obj);
						}

						//姓名
						// submit.consumeName = selectData[9][0].data[0];
						//电话
						// submit.mobile = selectData[10][0].data[0];
						// 请求
						var load = $.layerLoad("正在提交信息...");
						$.ajaxPackage({
							type: "post",
							url: "/fsservers/serversOrder/api/addContent",
							contentType: "application/json",
							async: true,
							data: JSON.stringify(submit),
							success: function (data, isError) {
								layer.close(load);
								if (!isError) {
									return;
								};
								if (data.httpCode != 200) {
									return;
								}
								window.location.href = "./pay.html?id=" + data.data.id;
							},
							error: function (XMLHttpRequest, textStatus, errorThrown) {
								console.log(textStatus);
							}
						});
					} else {
						//多选项将以后的项复制选择项
						if (index == 3) {
							var Iindex = index * 1 + 1;
							for (var i = Iindex; i < jsonData.length; i++) {
								if (jsonData[i][0].typeCode != 5) {
									var objarr = [];
									for (var j = 0; j < selectData[index][0].data.length; j++) {
										if (jsonData[i][j]) {
											jsonData[i][j].name = selectData[index][0].data[j];
											disposeAge(i,jsonData[i][j])
											objarr.push(jsonData[i][j]);
										} else {
											//复制上一个的数据
											jsonData[i][j] = JSON.parse(JSON.stringify(jsonData[i][j - 1]));
											jsonData[i][j].name = selectData[index][0].data[j];
											disposeAge(i,jsonData[i][j])
											objarr.push(jsonData[i][j]);
										}
									}
									jsonData[i] = objarr;
								}
							}
						}
						mobileSelect1.hide();
						index++;
						setTimeout(function () {
							showQuestion();
							initChoose(jsonData[index]);
							mobileSelect1.show();
						}, 100)

						setTimeout(function () {
							_this.scrollTo();
						}, 300)
					}
				}

				function disposeAge(index,ageData){
					if(index == 4){
						if(ageData.name == "本人"){
							setAge(ageData,18,106)
						}else if(ageData.name == "父亲" || ageData.name == "母亲" || ageData.name == "配偶父亲" || ageData.name == "配偶母亲"){
							setAge(ageData,35,106)
						}else{
							setAge(ageData,0,106)
						}
					}
				}

				//投保人年龄处理
				function setAge(ageData,start,end){
					var arr = [];
					for(var s=start;s<=end;s++){
						arr.push(s+"岁");
					}
					ageData.data[0].data = arr;
				}

			})

			//驶入框的下一步的点击项
			// $(".fixWidth_input").find(".fixWidth_btn").unbind("click");
			// $(".fixWidth_input").find(".fixWidth_btn").click(function () {
			// 	// //电话号码的校验
			// 	// if(index== jsonData.length-1 && !$.regular().isPhone($(this).parents(".fixWidth ").find("input").eq(0).val())){
			// 	// 	return $.layerMsg("请输入正确的手机号");
			// 	// }
			// 	_this.clearSelectData();
			// 	var ids = $(this).parents(".fixWidth").attr("index");
			// 	for (var i = 0; i < $(this).parents(".fixWidth ").find("input").length; i++) {
			// 		if ($.trim($(this).parents(".fixWidth ").find("input").eq(i).val()).length == 0) {
			// 			return $.layerMsg("请填写完对应的输入项");
			// 		}
			// 		selectData[index][ids].data[i] = $(this).parents(".fixWidth ").find("input").eq(i).val();
			// 	}

			// 	$(".customization_item").eq(index).find(".customization_item_answer").remove();
			// 	for (var i = 0; i < $(".panel .fixWidth").length; i++) {
			// 		for (var j = 0; j < $(".panel .fixWidth").eq(i).find(".selectContainer_input").length; j++) {
			// 			if (selectData[index][i].data[j]) {
			// 				var div = $('<div class="customization_item_answer">');
			// 				var divHtml = '<span class="customization_item_answer_title">' + $(".fixWidthBar span").eq(i).html() + ':</span><span class="customization_item_answer_info">' + selectData[index][i].data[j] + '</span>';
			// 				div.html(divHtml);
			// 				$(".customization_item").eq(index).append(div);
			// 			}
			// 		}
			// 	}

			// 	setTimeout(function () {
			// 		_this.scrollTo();
			// 	}, 100)

			// 	if (index == jsonData.length - 1) {
			// 		// 提交数据拼接
			// 		var submit = {};
			// 		//订单id
			// 		submit.orderId = orderId;
			// 		//性别
			// 		if (selectData[0][0].data[0] == "男") {
			// 			submit.consumeSex = 1;
			// 		} else {
			// 			submit.consumeSex = 2;
			// 		}

			// 		//家庭收入
			// 		submit.income = selectData[1][0].data[0];

			// 		//投保人信息
			// 		submit.content = [];
			// 		for (var i = 0; i < selectData[2][0].data.length; i++) {
			// 			var item = selectData[2][0].data[i];
			// 			var obj = {};
			// 			//关系
			// 			if (item == "本人") {
			// 				obj.customizeRelationship = 1;
			// 			} else if (item == "配偶") {
			// 				obj.customizeRelationship = 4;
			// 			} else if (item == "父亲") {
			// 				obj.customizeRelationship = 5;
			// 			} else if (item == "母亲") {
			// 				obj.customizeRelationship = 6;
			// 			} else if (item == "子女") {
			// 				obj.customizeRelationship = 3;
			// 			} else if (item == "配偶父亲") {
			// 				obj.customizeRelationship = 7;
			// 			} else if (item == "配偶母亲") {
			// 				obj.customizeRelationship = 8;
			// 			} else if (item == "儿子") {
			// 				obj.customizeRelationship = 9;
			// 			} else if (item == "女儿") {
			// 				obj.customizeRelationship = 10;
			// 			}

			// 			//生日
			// 			var moth, day;
			// 			if (parseInt(selectData[3][i].data[1].value) > 10) {
			// 				moth = parseInt(selectData[3][i].data[1].value);
			// 			} else {
			// 				moth = "0" + parseInt(selectData[3][i].data[1].value);
			// 			}

			// 			if (parseInt(selectData[3][i].data[2].value) > 10) {
			// 				day = parseInt(selectData[3][i].data[2].value);
			// 			} else {
			// 				day = "0" + parseInt(selectData[3][i].data[2].value);
			// 			}

			// 			obj.customizeBirthday = parseInt(selectData[3][i].data[0].value) + "-" + moth + "-" + day;
			// 			//有无社保
			// 			if (selectData[4][i].data == "有") {
			// 				obj.socialFlag = 1;
			// 			} else {
			// 				obj.socialFlag = 0;
			// 			}
			// 			//既往病史
			// 			obj.throughoutHistory = selectData[5][i].data;
			// 			//职业
			// 			if (selectData[6][i].data[0] == "室内轻体力（行政、管理人员）") {
			// 				obj.jobType = "001";
			// 			}
			// 			else if (selectData[6][i].data[0] == "室内重体力（程序员）") {
			// 				obj.jobType = "002";
			// 			}
			// 			else if (selectData[6][i].data[0] == "户外简单工作（导游、司机）") {
			// 				obj.jobType = "003";
			// 			}
			// 			else if (selectData[6][i].data[0] == "户外复杂工作（工程师、建筑工人）") {
			// 				obj.jobType = "004";
			// 			}
			// 			else if (selectData[6][i].data[0] == "室内制造业（装修、流水线）") {
			// 				obj.jobType = "005";
			// 			}
			// 			else if (selectData[6][i].data[0] == "家庭主妇") {
			// 				obj.jobType = "006";
			// 			}
			// 			else if (selectData[6][i].data[0] == "其他") {
			// 				obj.jobType = "007";
			// 			}

			// 			//生活状况
			// 			obj.liveCondition = selectData[7][i].data;
			// 			//地址
			// 			obj.homeAddress = selectData[8][i].data[0].value + selectData[8][i].data[1].value;
			// 			obj.addressCode = [];
			// 			for (var j = 0; j < selectData[8][i].data.length; j++) {
			// 				var aobj = {};
			// 				aobj.province = selectData[8][i].data[j].id;
			// 				aobj.value = selectData[8][i].data[j].value;
			// 				obj.addressCode.push(aobj);
			// 			}

			// 			submit.content.push(obj);
			// 		}

			// 		//姓名
			// 		submit.consumeName = selectData[9][0].data[0];
			// 		//电话
			// 		// submit.mobile = selectData[10][0].data[0];
			// 		// 请求
			// 		 var load = $.layerLoad("正在提交信息...");
			// 		$.ajaxPackage({
			// 			type: "post",
			// 			url: "/custom/personal/api/addContent",
			// 			contentType: "application/json",
			// 			async: true,
			// 			data: JSON.stringify(submit),
			// 			success: function (data, isError) {
			// 				layer.close(load);
			// 				if (!isError) {
			// 					return;
			// 				};
			// 				if (data.httpCode != 200) {
			// 					return;
			// 				}
			// 				window.location.href = "./pay.html?id=" + data.data.orderCustomizeId;
			// 			},
			// 			error: function (XMLHttpRequest, textStatus, errorThrown) {
			// 				console.log(textStatus);
			// 			}
			// 		});

			// 	} else {
			// 		mobileSelect1.hide();
			// 		index++;
			// 		setTimeout(function () {
			// 			showQuestion();
			// 			initChoose(jsonData[index]);
			// 			mobileSelect1.show();
			// 			if (index == jsonData.length - 1) {
			// 				$(".fixWidth_btn").html("提交")
			// 			}
			// 		}, 100)

			// 		setTimeout(function () {
			// 			_this.scrollTo();
			// 		}, 300)
			// 	}


			// })

			//滚动项下一步的点击事件
			$(".fixWidth_select .fixWidth_btn").unbind("click");
			$(".fixWidth_select .fixWidth_btn").click(function () {
				_this.clearSelectData();
				var ppIdx = $(this).parents(".fixWidth").attr("index");
				if (_this.type != 4) {
					$(".customization_item").eq(index).find(".customization_item_answer").remove();
					for (var j = 0; j < $(this).parent().find(".wheel").length; j++) {
						selectData[index][ppIdx].data[j] = _this.getInnerHtml(ppIdx, j)
					}

					//显示数据
					for (var i = 0; i < selectData[index].length; i++) {
						var div = $('<div class="customization_item_answer">');
						div.html('<span class="customization_item_answer_title">' + $(".fixWidthBar span").eq(i).html() + ':</span>');
						for (var j = 0; j < selectData[index][i].data.length; j++) {
							if (selectData[index][i].data[j]) {
								var span = $('<span class="customization_item_answer_info">');
								span.html(selectData[index][i].data[j]);
								div.append(span);
							}
						}
						$(".customization_item").eq(index).append(div);
					}

					setTimeout(function () {
						_this.scrollTo();
					}, 100)

					//判断是否都有数据
					var obIdx = -1;
					var obFlg = false;
					for (var i = 0; i < selectData[index].length; i++) {
						if (selectData[index][i] && selectData[index][i].data.length == 0) {
							obIdx = i;
							obFlg = true;
							break
						}
					}
					if (obFlg) {
						_this.displayStyle(obIdx);
					} else {
						index++;
						setTimeout(function () {
							showQuestion();
							initChoose(jsonData[index]);
							mobileSelect1.show();
						}, 100)

						setTimeout(function () {
							_this.scrollTo();
						}, 300)
					}
				} else {
					$(".customization_item").eq(index).find(".customization_item_answer").remove();
					for (var j = 0; j < $(this).parent().find(".wheel").length; j++) {
						selectData[index][ppIdx].data[j] = _this.getInnerHtml_select(ppIdx, j)
					}

					//显示数据
					for (var i = 0; i < selectData[index].length; i++) {
						var div = $('<div class="customization_item_answer">');
						div.html('<span class="customization_item_answer_title">' + $(".fixWidthBar span").eq(i).html() + ':</span>');
						for (var j = 0; j < selectData[index][i].data.length; j++) {
							if (selectData[index][i].data[j]) {
								var span = $('<span class="customization_item_answer_info">');
								span.html(selectData[index][i].data[j].value);
								div.append(span);
							}
						}
						$(".customization_item").eq(index).append(div);
					}

					setTimeout(function () {
						_this.scrollTo();
					}, 100)

					
						//判断是否都有数据
						var obIdx = -1;
						var obFlg = false;
						for (var i = 0; i < selectData[index].length; i++) {
							if (selectData[index][i] && selectData[index][i].data.length == 0) {
								obIdx = i;
								obFlg = true;
								break
							}
						}
						if (obFlg) {
							_this.displayStyle(obIdx);
						} else {
							index++;
							setTimeout(function () {
								showQuestion();
								initChoose(jsonData[index]);
								mobileSelect1.show();
							}, 100)

							setTimeout(function () {
								_this.scrollTo();
							}, 300)
							
						}
					}

			})

			//滚动选择项的touch事件
			$(".selectContainer li").unbind("touchstart")
			$(".selectContainer li").unbind("touchend")
			$(".selectContainer li").unbind("touchmove");
			$(".selectContainer li").on("touchstart", function () {
				_this.touch(event, $(this));
			})
			$(".selectContainer li").on("touchend", function () {
				_this.touch(event, $(this));
			})
			$(".selectContainer li").on("touchmove", function () {
				_this.touch(event, $(this));
			})

			//给li绑定点击事件
			$(".selectContainer li").unbind("click");
			$(".selectContainer li").on("click", function () {
				var i = $(this).parents(".fixWidth").attr("index");
				var j = $(this).parents(".wheel").attr("index");
				var index = $(this).index();
				_this.singleClick($(this), index, i, j);
			})
		},

		//touch事件处理
		touch: function (event, obj) {
			var _this = this;
			var that = obj;
			event = event || window.event;
			var i = that.parents(".fixWidth").attr("index");
			var j = that.parents(".wheel").attr("index");
			switch (event.type) {
				case "touchstart":
					_this.startY = event.touches[0].clientY;
					_this.startY = parseInt(_this.startY);
					_this.oldMoveY = _this.startY;
					break;

				case "touchend":

					_this.moveEndY = event.changedTouches[0].clientY;
					_this.offsetSum = _this.moveEndY - _this.startY;

					//修正位置
					_this.updateCurDistance(that.parents(".selectContainer")[0], i, j);
					_this.curDistance[i].data[j] = _this.fixPosition(_this.curDistance[i].data[j]);
					_this.movePosition(that.parents(".selectContainer"), _this.curDistance[i].data[j]);
					_this.oversizeBorder = -(that.parent().find("li").length - 3) * _this.liHeight;

					//反弹
					if (_this.curDistance[i].data[j] + _this.offsetSum > 2 * _this.liHeight) {
						_this.curDistance[i].data[j] = 2 * _this.liHeight;
						setTimeout(function () {
							_this.movePosition(that.parents(".selectContainer"), _this.curDistance[i].data[j]);
						}, 100);

					} else if (_this.curDistance[i].data[j] + _this.offsetSum < _this.oversizeBorder) {
						_this.curDistance[i].data[j] = _this.oversizeBorder;
						setTimeout(function () {
							_this.movePosition(that.parents(".selectContainer"), _this.curDistance[i].data[j]);
						}, 100);
					}

					if (_this.cascade) {
						var tempPosArr = _this.getIndexArr();
						tempPosArr[i].data[j] = _this.getIndex(_this.curDistance[i].data[j]);
						_this.checkRange(i, j, tempPosArr);
					}

					break;
				case "touchmove":
					event.preventDefault();
					_this.moveY = event.touches[0].clientY;
					_this.offset = _this.moveY - _this.oldMoveY;

					_this.updateCurDistance(that.parents(".selectContainer")[0], i, j);
					_this.curDistance[i].data[j] = _this.curDistance[i].data[j] + _this.offset;
					_this.movePosition(that.parents(".selectContainer"), _this.curDistance[i].data[j]);
					_this.oldMoveY = _this.moveY;
					break;
			}
		},

		singleClick: function (theLi, index, i, j) {
			var _this = this;
			if (_this.cascade) {
				var tempPosArr = _this.getIndexArr();
				tempPosArr[i].data[j] = index;
				var count = 0;
				if ($(".fixWidth_select").eq(i).find(".selectContainer").length - 1 > j) {
					count = $(".fixWidth_select").eq(i).find(".selectContainer").length - 1 - j;
					for (var k = count; k > j; k--) {
						tempPosArr[i].data[k] = 0;
					}
				}
				_this.checkRange(i, j, tempPosArr);

			} else {
				_this.curDistance[i].data[j] = (2 - index) * _this.liHeight;
				_this.movePosition(theLi.parents(".selectContainer"), _this.curDistance[i].data[j]);
			}
		},
		checkRange: function (index, j, posIndexArr) {
			var _this = this;
			var deleteNum = displayJsonData[index].length - 1 - j;
			for (var i = 0; i < deleteNum; i++) {
				displayJsonData[index].pop(); //修改 displayJson
			}
			var resultNode;
			for (var i = 0; i <= j; i++) {
				if (i == 0)
					resultNode = _this.cascadeJsonData[index][posIndexArr[index].data[i]];
				else {
					resultNode = resultNode[_this.keyMap.children][posIndexArr[index].data[i]];
				}
			}
			_this.checkArrDeep(index, resultNode);
			//console.log(_this.displayJson);
			_this.reRenderWheels(index);
			_this.fixRowStyle();
			_this.setCurDistance(_this.resetPostion(index, j, posIndexArr));
		},

		resetPostion: function (index, j, posIndexArr) {
			var _this = this;
			var tempPosArr = posIndexArr;
			var tempCount;
			if ($(".fixWidth_select").eq(index).find(".selectContainer").length > posIndexArr[index].data.length) {
				tempCount = $(".fixWidth_select").eq(index).find(".selectContainer").length - posIndexArr[index].data.length;
				for (var i = 0; i < tempCount; i++) {
					posIndexArr[index].data.push(0);
				}
			} else if ($(".fixWidth_select").eq(index).find(".selectContainer").length < posIndexArr[index].data.length) {
				tempCount = posIndexArr.length - $(".fixWidth_select").eq(_this.ids).find(".selectContainer").length;
				for (var i = 0; i < tempCount; i++) {
					posIndexArr[index].data.pop();
				}
			}
			for (var i = j * 1 + 1; i < posIndexArr[index].data.length; i++) {
				posIndexArr[index].data[i] = 0;
			}
			return posIndexArr;
		},
		getValue: function () {
			var _this = this;
			var temp = [];
			var positionArr = _this.getIndexArr();
			if (_this.cascade) {
				for (var i = 0; i < _this.wheel.length; i++) {
					temp.push(_this.displayJson[i][positionArr[i]]);
				}
			}
			else if (_this.jsonType) {
				for (var i = 0; i < _this.curDistance.length; i++) {
					temp.push(_this.wheelsData[i].data[_this.getIndex(_this.curDistance[i].data[j])]);
				}
			} else {
				for (var i = 0; i < _this.curDistance.length; i++) {
					temp.push(_this.getInnerHtml(i));
				}
			}
			return temp;
		},

		getInnerHtml: function (i, j) {
			var _this = this;
			var index = _this.getIndex(_this.curDistance[i].data[j]);
			return $(".panel .fixWidth").eq(i).find(".wheel").eq(j).find("li").eq(index).html();
		},

		getInnerHtml_select: function (i, j) {
			var _this = this;
			var index = _this.getIndex(_this.curDistance[i].data[j]);
			var obj = {};
			obj.id = $(".panel .fixWidth").eq(i).find(".wheel").eq(j).find("li").eq(index).attr("data-id");
			obj.value = $(".panel .fixWidth").eq(i).find(".wheel").eq(j).find("li").eq(index).html();
			return obj;
		},

		scrollTo: function () {
			var heights = $(".customization_item").eq(index).offset().top;
			console.log(heights);
			$(".customization_content_box").scrollTop(heights);
		},
		//清除选中记录数据
		clearSelectData: function () {
			var idss = index * 1 + 1;
			selectData = selectData.slice(0, idss);
			$(".customization_item").hide();
			for (var i = idss; i < $(".customization_item").length; i++) {
				$(".customization_item").eq(i).find(".customization_item_answer").remove();
			}
			for (var i = 0; i <= index; i++) {
				$(".customization_item").eq(i).show();
			}
		}
	};


	if (typeof exports == "object") {
		module.exports = MobileSelect;
	} else if (typeof define == "function" && define.amd) {
		define([], function () {
			return MobileSelect;
		})
	} else {
		window.MobileSelect = MobileSelect;
	}

})();
