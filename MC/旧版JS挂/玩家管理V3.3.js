var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var version = 3.3
var admins = []
var adname = []
var showon
var buttontype
var tpopx = 0;
var tpopy = 0;
var mX, mY
var downa = false
var xgc = false
var xghp = false
var dl = 0
var ba
var nopl1 = []
var nopl2 = []
var ms = "1.修复 无法显示服主按钮\n新版本让各位失望了，不过! 玩家管理V3.4增加增加各种功能都是大家提供的!， V3.4 的更新可能会有点久!"
var settd
var aton = 0
var atpl = []
var pl = [];
var n = "Not a player";
var fz;
var fs = 5
var dia;
var f = ModPE.readData(version);
var c = ChatColor.GREEN
var posd
var zcm = ""
try {
	for (var i = 0; i < 15; i++) {
		var getr = Math.floor(Math.random(0) * (35))
		if (getr == 0) zcm = zcm + "A"
		if (getr == 1) zcm = zcm + "B"
		if (getr == 2) zcm = zcm + "C"
		if (getr == 3) zcm = zcm + "D"
		if (getr == 4) zcm = zcm + "D"
		if (getr == 5) zcm = zcm + "F"
		if (getr == 6) zcm = zcm + "G"
		if (getr == 7) zcm = zcm + "H"
		if (getr == 8) zcm = zcm + "I"
		if (getr == 9) zcm = zcm + "J"
		if (getr == 10) zcm = zcm + "K"
		if (getr == 11) zcm = zcm + "L"
		if (getr == 12) zcm = zcm + "M"
		if (getr == 13) zcm = zcm + "N"
		if (getr == 14) zcm = zcm + "O"
		if (getr == 15) zcm = zcm + "P"
		if (getr == 16) zcm = zcm + "Q"
		if (getr == 17) zcm = zcm + "R"
		if (getr == 18) zcm = zcm + "S"
		if (getr == 19) zcm = zcm + "T"
		if (getr == 20) zcm = zcm + "U"
		if (getr == 21) zcm = zcm + "V"
		if (getr == 22) zcm = zcm + "W"
		if (getr == 23) zcm = zcm + "X"
		if (getr == 24) zcm = zcm + "Y"
		if (getr == 25) zcm = zcm + "Z"
		if (getr == 26) zcm = zcm + 0
		if (getr == 27) zcm = zcm + 1
		if (getr == 28) zcm = zcm + 2
		if (getr == 29) zcm = zcm + 3
		if (getr == 30) zcm = zcm + 4
		if (getr == 31) zcm = zcm + 5
		if (getr == 32) zcm = zcm + 6
		if (getr == 33) zcm = zcm + 7
		if (getr == 34) zcm = zcm + 8
		if (getr == 35) zcm = zcm + 9
	}
	var gets = null
	var but = 0


	function dial() {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var dialog = new android.app.AlertDialog.Builder(ctx)
					dialog.setTitle("玩家管理V" + version + " - 联机助手 [信息]")
					dialog.setMessage("感谢使用此JS !\n玩家管理JS 将还会再次更新!所以大家要多看看贴哦! \n\nV" + version + "版本增加了以下功能:\n" + ms + "\n\n本JS只支持[0.11.x-0.12.x]版本的我的世界\n-Critical闪")
					dialog.setPositiveButton("好的", new android.content.DialogInterface.OnClickListener() {
						onClick: function(dia, w) {
							/*点确定时执行*/
						}
					})
					dialog.show()
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	function entityRemovedHook(ent) {
		for (var i in mobs)
			if (ent == mobs[i].ent) {
				mobs.splice(i, 1)
				break
			}
	}

	function newLevel() {
		if (read("v1 init") != 1) {
			ModPE.saveData("v1 init", "1")
			ModPE.saveData("v1 timeout", "20")
			for (var i = 0; i < 4; i++) {
				MOBS[i].color = 7
				ModPE.saveData("v1 color" + i, "7")
			}
			for (; i < 9; i++) {
				MOBS[i].color = 14
				ModPE.saveData("v1 color" + i, "13")
			}
		} else {
			if (read("v1 eng") == 1) {
				var names = [" 鸡 ", "牛", "猪", "羊", "僵尸", " 苦力怕 ", " 骷髅 ", " 蜘蛛 ", " 猪人 "]
				for (var i in names) {
					MOBS[i].name = names[i]
				}
				deathWord = "死亡"
			}
			if (read("v1 doubleLine") == 1) divider = "\n"
			timeout = read("v1 timeout")
			for (var i in MOBS)
				MOBS[i].color = read("v1 color" + i)
		}
		fz = getPlayerEnt();
		Entity.setNameTag(fz, "<服主>" + Player.getName(fz))
		buttonl();
		if (buttontype == 1) {
			clientMessage(ChatColor.GREEN + " [玩家管理V" + version + "]：" + ChatColor.WHITE + "右下角的 [玩家] 按钮可长按移动哦 ~")
		} else clientMessage(ChatColor.GREEN + " [玩家管理V" + version + "]：" + ChatColor.WHITE + "看到右下角的新按钮了吗？ 长按试试 ~")
	}
	var mobid = []

	function entityAddedHook(e) {
		showon = ModPE.readData("生物显血")
		buttontype = ModPE.readData("按钮类型")
		if (Entity.getEntityTypeId(e) == 63) {
			pl.push(e);
		}
		var type = Entity.getEntityTypeId(e)
		for (var i in MOBS)
			if (type == MOBS[i].id) {
				var MOB = MOBS[i]
				mobid.push(e)
				if (showon == 1) {
					mobs.push(new Mob(e, MOB.name, MOB.full, COLORS[MOB.color]))
				} else {
					for (var i in mobid) Entity.setNameTag(mobid[i], "")
				}
				break
			}
	}

	function tpm() {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					dia = new android.app.Dialog(ctx);
					dia.setTitle("玩家管理V" + version);
					dia.setContentView(scroll);
					dia.show();
					var n0 = new android.widget.Button(ctx);
					n0.setTextSize(25);
					n0.setWidth(250);
					if (pl.length > 0 && Player.getName(pl[0]) != n) {
						n0.setText(Player.getName(pl[0]));
					} else n0.setText("等待玩家加入游戏");
					n0.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (Player.getName(pl[0]) != n)
								setting(pl[0]);
						}
					}));
					layout.addView(n0);
					var n1 = new android.widget.Button(ctx);
					n1.setTextSize(25);
					if (pl.length > 1 && Player.getName(pl[1]) != n) {
						n1.setText(Player.getName(pl[1]))
					} else n1.setText("等待玩家加入游戏")
					n1.setOnLongClickListener(new android.view.View.OnLongClickListener() {
						onLongClick: function(v) {
							if (Player.getName(pl[1]) != n) {
								Entity.setPosition(fz, Entity.getX(pl[1]), Entity.getY(pl[1]), Entity.getZ(pl[1]))
								say("您被传送到<" + Player.getName(pl[1]) + ">的位置")
							}
							return true
						}
					});
					n1.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (Player.getName(pl[1]) != n)
								setting(pl[1])
						}
					}))
					layout.addView(n1)
					var n2 = new android.widget.Button(ctx)
					n2.setTextSize(25)
					if (pl.length > 2 && Player.getName(pl[2]) != n) {
						n2.setText(Player.getName(pl[2]))
					} else n2.setText("等待玩家加入游戏")
					n2.setOnLongClickListener(new android.view.View.OnLongClickListener() {
						onLongClick: function(v) {
							if (Player.getName(pl[2]) != n) {
								Entity.setPosition(fz, Entity.getX(pl[2]), Entity.getY(pl[2]), Entity.getZ(pl[2]))
								say("您被传送到<" + Player.getName(pl[2]) + ">的位置")
							}
							return true
						}
					});
					n2.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (Player.getName(pl[2]) != n)
								setting(pl[2])
						}
					}))
					layout.addView(n2)
					var n3 = new android.widget.Button(ctx)
					n3.setTextSize(25)
					if (pl.length > 3 && Player.getName(pl[3]) != n) {
						n3.setText(Player.getName(pl[3]))
					} else n3.setText("等待玩家加入游戏")
					n3.setOnLongClickListener(new android.view.View.OnLongClickListener() {
						onLongClick: function(v) {
							if (Player.getName(pl[3]) != n) {
								Entity.setPosition(fz, Entity.getX(pl[3]), Entity.getY(pl[3]), Entity.getZ(pl[3]))
								say("您被传送到<" + Player.getName(pl[3]) + ">的位置")
							}
							return true
						}
					});
					n3.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (Player.getName(pl[3]) != n)
								setting(pl[3])
						}
					}))
					layout.addView(n3)
					var n4 = new android.widget.Button(ctx)
					n4.setTextSize(25)
					if (pl.length > 4 && Player.getName(pl[4]) != n) {
						n4.setText(c + Player.getName(pl[4]))
					} else n4.setText("等待玩家加入游戏")
					n4.setOnLongClickListener(new android.view.View.OnLongClickListener() {
						onLongClick: function(v) {
							if (Player.getName(pl[4]) != n) {
								Entity.setPosition(fz, Entity.getX(pl[4]), Entity.getY(pl[4]), Entity.getZ(pl[4]))
								say("您被传送到<" + Player.getName(pl[4]) + ">的位置")
							}
							return true
						}
					});
					n4.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							setting(pl[4])
						}
					}))
					layout.addView(n4)
					var n5 = new android.widget.Button(ctx);
					n5.setTextSize(25);
					n5.setWidth(250);
					if (pl.length > 5 && Player.getName(pl[5]) != n) {
						n5.setText(Player.getName(pl[5]));
					} else n5.setText("等待玩家加入游戏");
					n5.setOnLongClickListener(new android.view.View.OnLongClickListener() {
						onLongClick: function(v) {
							if (Player.getName(pl[5]) != n) {
								Entity.setPosition(fz, Entity.getX(pl[5]), Entity.getY(pl[5]), Entity.getZ(pl[5]))
								say("您被传送到<" + Player.getName(pl[5]) + ">的位置")
							}
							return true
						}
					});
					n5.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (Player.getName(pl[0]) != n)
								setting(pl[5]);
						}
					}));
					layout.addView(n5);
					var blank = new android.widget.TextView(ctx)
					blank.setText(" ")
					blank.setTextSize(27)
					layout.addView(blank)
					var back = new android.widget.Button(ctx)
					back.setText("世界管理")
					back.setTextColor(android.graphics.Color.CYAN)
					back.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							world()
						}
					}))
					layout.addView(back)
					var jset = new android.widget.Button(ctx)
					jset.setText("JS设置")
					jset.setTextColor(android.graphics.Color.CYAN)
					jset.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							jsetting()
						}
					}))
					layout.addView(jset)
				} catch (err) {
					print(err)
				}
			}
		}))
	}
	var gui = null

	function buttonl() {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					if (buttontype == 0) {
						var button = new android.widget.ImageView(ctx);
						button.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode(buttonimg, 0), 0, android.util.Base64.decode(buttonimg, 0).length));
						button.setImageAlpha(button.getImageAlpha() - 50)
						button.setOnTouchListener(new android.view.View.OnTouchListener({
							onTouch: function(v, e) {
								var a = e.getAction()
								if (a == 2) {
									button.setImageAlpha(button.getImageAlpha() - 100)
								}
								if (a == 1) {
									button.setImageAlpha(button.getImageAlpha() - 50)
								}
								return false;
							}
						}));
					} else {
						var button = new android.widget.Button(ctx)
						button.setText("玩家")
						button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(75, 42, 2, 3)));
					}
					button.setOnClickListener(new android.view.View.OnClickListener() {
						onClick: function(v) {
							if (pl[0] != getPlayerEnt()) {
								pl.push(getPlayerEnt())
							}
							tpm()
						}
					});
					button.setOnLongClickListener(new android.view.View.OnLongClickListener() {
						onLongClick: function(v, t) {
							downa = true;
							ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(40);
							return true
						}
					});
					button.setOnTouchListener(new android.view.View.OnTouchListener({
						onTouch: function(v, e) {
							if (!downa) {
								mX = e.getX();
								mY = e.getY()
							}
							if (downa) {
								var a = e.getAction();
								if (a == 2) {
									var delX = parseInt(e.getX() - mX) * -1 / 10;
									var delY = parseInt(e.getY() - mY) * -1 / 10;
									tpopx = tpopx + delX;
									tpopy = tpopy + delY;
									gui.update(parseInt(tpopx), parseInt(tpopy), -1, -1);
								}
								if (a == 1) downa = false;
							}
							return false;
						}
					}));
					layout.addView(button);
					gui = new android.widget.PopupWindow(layout, dip2px(ctx, 0), dip2px(ctx, 0));
					gui.setContentView(layout);
					gui.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
					gui.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
					gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, tpopx, tpopy)
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	function dip2px(ctx, dips) {
		return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
	}

	function setting(n) {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					settd = new android.app.Dialog(ctx);
					settd.setTitle("管理玩家:" + Player.getName(n));
					settd.setContentView(scroll);
					settd.show()
					var nad = new android.widget.Button(ctx)
					nad.setTextSize(25)
					if (getName(n) == "(管理员)") {
						nad.setText("取消管理员")
					} else nad.setText("设为管理员")
					nad.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (n != fz) {
								if (getName(n) != "(管理员)") {
									say("已设 " + Player.getName(n) + " 为管理员")
									Entity.setNameTag(n, "(管理员)" + Player.getName(n))
									admins.push(n)
									adname.push(Player.getName(n))
								} else {
									for (var all in admins) {
										if (admins[all] == n)
											admins.splice(all, 1)
									}
									say("已取消 " + getOriName(n) + " 的管理员")
									Entity.setNameTag(n, getOriName(n))
								}
								settd.dismiss()
								dia.dismiss()
							} else say("您是服主，您比管理员还高。")
						}
					}))
					nad.setOnLongClickListener(new android.view.View.OnLongClickListener() {
						onLongClick: function(v) {
							newInfo()
							return true
						}
					});
					layout.addView(nad)
					var n5 = new android.widget.Button(ctx)
					n5.setTextSize(25)
					n5.setWidth(222)
					n5.setText("给Ta物品")
					n5.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							additem(n)
						}
					}))
					layout.addView(n5)
					var spaw = new android.widget.Button(ctx)
					spaw.setTextSize(25)
					spaw.setText("在Ta位置生成生物")
					spaw.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							spawnwindow(n)
							settd.dismiss()
						}
					}))
					layout.addView(spaw)
					var n2 = new android.widget.Button(ctx)
					n2.setTextSize(25)
					n2.setText("让Ta燃烧" + fs + "秒 (长按设置)")
					n2.setOnLongClickListener(new android.view.View.OnLongClickListener() {
						onLongClick: function(v) {
							fsset()
							return true
						}
					});
					n2.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Entity.setFireTicks(n, fs)
							say(Player.getName(n) + " 被燃烧" + fs + "秒")
							settd.dismiss()
							dia.dismiss()
						}
					}))
					layout.addView(n2)
					var tel = new android.widget.Button(ctx)
					tel.setTextSize(25)
					tel.setTextColor(android.graphics.Color.CYAN)
					tel.setText("传送与跟踪功能")
					tel.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							tpwindow(n)
						}
					}))
					layout.addView(tel)
					/*
					var ride=new android.widget.Button(ctx)
					ride.setTextSize(25)
					ride.setTextColor( android.graphics.Color.CYAN)
					ride.setText("骑到Ta头上")
					ride.setOnClickListener(new android.view.View.OnClickListener({
					onClick:function(v){
					rideAnimal(fz,n)
					}}))
					layout.addView(ride)*/
					var n1 = new android.widget.Button(ctx)
					n1.setTextSize(25)
					n1.setText("修改血量")
					n1.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							heset(n)
						}
					}))
					layout.addView(n1)
					var n44 = new android.widget.Button(ctx)
					n44.setTextSize(25)
					n44.setText("药水作用")
					n44.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							potion(n)
							dia.dismiss()
						}
					}))
					layout.addView(n44)
					if (ModPE.getMinecraftVersion() != "0.12.1") {
						var n4 = new android.widget.Button(ctx)
						n4.setTextSize(25)
						n4.setText("让Ta潜行(长按取消)")
						n4.setOnLongClickListener(new android.view.View.OnLongClickListener() {
							onLongClick: function(v) {
								Entity.setSneaking(n, false)
								return true
							}
						});
						n4.setOnClickListener(new android.view.View.OnClickListener({
							onClick: function(v) {
								Entity.setSneaking(n, true)
								settd.dismiss()
							}
						}))
						layout.addView(n4)
					}
					var noattack = new android.widget.Button(ctx)
					noattack.setTextSize(25)
					noattack.setText("禁止攻击")
					noattack.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							nosetting(n)
						}
					}))
					layout.addView(noattack)
					var kick = new android.widget.Button(ctx)
					kick.setTextSize(25)
					kick.setText("踢出存档")
					kick.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (fz != n) {
								say("玩家：" + Player.getName(n) + " 被踢出存档")
								clientMessage(ChatColor.YELLOW + "玩家：" + Player.getName(n) + "已被踢出")
								Entity.remove(n)
							} else say("你要踢出自己吗？")
						}
					}))
					layout.addView(kick)
					var rename = new android.widget.Button(ctx)
					rename.setTextSize(25)
					rename.setText("给Ta取名")
					rename.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							ren(n)
						}
					}))
					layout.addView(rename)
					var ench = new android.widget.Button(ctx)
					ench.setTextSize(25)
					ench.setText("给Ta附魔经验 (可长按)")
					ench.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (ModPE.getMinecraftVersion() != "0.12.1") {
								ench.setText("不支持您的游戏版本")
							} else
								Level.spawnMob(Entity.getX(n), Entity.getY(n) - 1, Entity.getZ(n), 68)
						}
					}))
					ench.setOnTouchListener(new android.view.View.OnTouchListener({
						onTouch: function(v, e) {
							if (ModPE.getMinecraftVersion() != "0.12.1") {
								ench.setText("不支持您的游戏版本")
							} else
								Level.spawnMob(Entity.getX(n), Entity.getY(n) - 1, Entity.getZ(n), 68)
							return true
						}
					}));
					layout.addView(ench)
					var blank = new android.widget.TextView(ctx)
					blank.setText(" ")
					blank.setTextSize(27)
					layout.addView(blank)
					var back = new android.widget.Button(ctx)
					back.setTextSize(30)
					back.setText("返回")
					back.setTextColor(android.graphics.Color.BLACK)
					back.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.WHITE))
					back.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							settd.dismiss()
						}
					}))
					layout.addView(back)
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	function leaveGame() {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					if (gui != null) {
						gui.dismiss()
						gui = null
						pl = []
					}
					if (fbutton != null) {
						goe = null
						gofind = false
						fbutton.dismiss()
						fbutton = null
					}
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	function ren(n) {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					var a = new android.app.Dialog(ctx);
					a.setTitle("请输入昵称");
					a.setContentView(scroll);
					a.show()
					var name = new android.widget.EditText(ctx)
					name.setHint("对方昵称")
					name.setWidth(250)
					layout.addView(name)
					var ent = new android.widget.Button(ctx)
					ent.setText("确定")
					ent.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							say("已给玩家：" + Player.getName(n) + " 取名为：" + name.getText())
							Entity.setNameTag(n, name.getText())
						}
					}))
					layout.addView(ent)
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	function say(str) {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				android.widget.Toast.makeText(ctx, str, 0).show()
			}
		}))
	}
	var guishowing = false;

	function modTick() {
		if (fbutton != null) {
			if (goe != null && Player.getName(goe) == "Not a player") {
				ctx.runOnUiThread(new java.lang.Runnable({
					run: function() {
						try {
							fbutton.dismiss()
							say("玩家不存在")
							gofind = false
							goe = null
						} catch (err) {
							print(err)
						}
					}
				}))
			}
		}
		if (gofind) {
			var coX = Math.round(Entity.getX(fz));
			var coZ = Math.round(Entity.getZ(fz));
			var vX = 0,
				vZ = 0;
			var sEX = Math.round(Entity.getX(goe));
			var sEY = Math.round(Entity.getY(goe));
			var sEZ = Math.round(Entity.getZ(goe));
			var yaw = Math.atan2((sEZ - coZ), (sEX - coX));
			if ((sEX - 3) > coX) {
				vX = 0.30;
			} else
			if ((sEZ - 3) > coZ) {
				vZ = 0.30;
			} else
			if (coX > (sEX + 3)) {
				vX = -0.30;
			} else
			if (coZ > (sEZ + 3)) {
				vZ = -0.30;
			} else {
				gofind = false
			}
			Entity.setVelX(fz, vX);
			Entity.setVelZ(fz, vZ);
		}
		for (var ix = 0; ix < pl.length; ix++) {
			if (Player.getName(pl[ix]) == n) pl.splice(ix, 1)
		}
		if (++time == timeout) {
			time = 0
			for (var i in mobs)
				mobs[i].update()
		}
	}
	var pota

	function potion(p) {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					pota = new android.app.Dialog(ctx);
					pota.setTitle("选择药水");
					pota.setContentView(scroll);
					pota.show()
					var y0 = new android.widget.Button(ctx)
					y0.setText("设置药水时长 当前:" + pos + "秒")
					y0.setTextSize(15);
					y0.setWidth(250);
					y0.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							poset()
						}
					}))
					layout.addView(y0)
					var y1 = new android.widget.Button(ctx)
					y1.setText("速度药水")
					y1.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Entity.addEffect(p, 1, pos * 20, posd, false, true);
							say("已给玩家<" + Player.getName(p) + ">加入速度药水")
						}
					}))
					layout.addView(y1)
					var y2 = new android.widget.Button(ctx)
					y2.setText("力量药水")
					y2.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Entity.addEffect(p, 5, pos * 20, posd, false, true);
							say("已给玩家<" + Player.getName(p) + ">加入力量药水")
						}
					}))
					layout.addView(y2)
					var y3 = new android.widget.Button(ctx)
					y3.setText("恢复药水")
					y3.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Entity.addEffect(p, 10, pos * 20, posd, false, true);
							say("已给玩家<" + Player.getName(p) + ">加入恢复药水")
						}
					}))
					layout.addView(y3)
					var y4 = new android.widget.Button(ctx)
					y4.setText("高跳药水")
					y4.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Entity.addEffect(p, 8, pos * 20, posd, false, true);
							say("已给玩家<" + Player.getName(p) + ">加入高跳药水")
						}
					}))
					layout.addView(y4)
					var y5 = new android.widget.Button(ctx)
					y5.setText("潜水药水")
					y5.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Entity.addEffect(p, 13, pos * 20, posd, false, true);
							say("已给玩家<" + Player.getName(p) + ">加入潜水药水")
						}
					}))
					layout.addView(y5)
					var y6 = new android.widget.Button(ctx)
					y6.setText("中毒药水")
					y6.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Entity.addEffect(p, 19, pos * 20, posd, false, true);
							say("已给玩家<" + Player.getName(p) + ">加入中毒药水")
						}
					}))
					layout.addView(y6)
					var y7 = new android.widget.Button(ctx)
					y7.setText("失明药水")
					y7.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Entity.addEffect(p, 15, pos * 20, posd, false, true);
							say("已给玩家<" + Player.getName(p) + ">加入失明药水")
						}
					}))
					layout.addView(y7)
					/*
					var y8=new android.widget.Button(ctx)
					y8.setText("失明药水")
					y8.setOnClickListener(new android.view.View.OnClickListener({
					onClick:function(v){
					Entity.addEffect(p, 15, pos*20, posd, false, true);
					 say("已给玩家<"+Player.getName(p)+">加入失明药水")
					}}))
					layout.addView(y8)*/
					var y9 = new android.widget.Button(ctx)
					y9.setText("隐身药水")
					y9.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Entity.addEffect(p, MobEffect.invisibility, pos * 20, posd, false, true);
							say("已给玩家<" + Player.getName(p) + ">加入隐身药水")
						}
					}))
					layout.addView(y9)
					var y10 = new android.widget.Button(ctx)
					y10.setText("夜视药水")
					y10.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Entity.addEffect(p, MobEffect.nightVision, pos * 20, posd, false, true);
							say("已给玩家<" + Player.getName(p) + ">加入夜视药水")
						}
					}))
					layout.addView(y10)
					var blank = new android.widget.TextView(ctx)
					blank.setText(" ")
					blank.setTextSize(27)
					layout.addView(blank)
					var back = new android.widget.Button(ctx)
					back.setTextSize(30)
					back.setText("返回")
					back.setTextColor(android.graphics.Color.BLACK)
					back.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.WHITE))
					back.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							pota.dismiss()
						}
					}))
					layout.addView(back)
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	function fsset() {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					var a = new android.app.Dialog(ctx);
					a.setTitle("修改秒数");
					a.setContentView(scroll);
					a.show()
					var bjk = new android.widget.EditText(ctx)
					bjk.setHint("燃烧秒数")
					layout.addView(bjk)
					var n2 = new android.widget.Button(ctx)
					n2.setTextSize(25)
					n2.setText("确定")
					n2.setTextColor(android.graphics.Color.BLACK)
					n2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.WHITE))
					n2.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (bjk.getText() > 20) {
								say("请不要超过20秒!")
							} else {
								fs = bjk.getText()
								say("已修改为:" + bjk.getText())
								a.dismiss()
								settd.dismiss()
							}
						}
					}))
					layout.addView(n2)
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	function heset(n) {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					var a = new android.app.Dialog(ctx);
					a.setTitle("血量修改");
					a.setContentView(scroll);
					a.show()
					var bjk = new android.widget.EditText(ctx)
					bjk.setHint("默认为20 [满血]")
					layout.addView(bjk)
					var n2 = new android.widget.Button(ctx)
					n2.setTextSize(25)
					n2.setText("确定")
					n2.setTextColor(android.graphics.Color.BLACK)
					n2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.WHITE))
					n2.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (bjk.getText() > 40) {
								say("请不要超过40!")
							} else {
								if (bjk.getText() == "") {
									Entity.setHealth(n, 20)
									say("已修改为:20")
								} else {
									Entity.setHealth(n, bjk.getText())
									say("已修改为:" + bjk.getText())
								}
								a.dismiss()
								settd.dismiss()
							}
						}
					}))
					layout.addView(n2)
				} catch (err) {
					print(err)
				}
			}
		}))
	}
	var pos = 30

	function poset() {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					var a = new android.app.Dialog(ctx);
					a.setTitle("修改秒数");
					a.setContentView(scroll);
					a.show()
					var bjk = new android.widget.EditText(ctx)
					bjk.setHint("药水秒数")
					layout.addView(bjk)
					var bjkd = new android.widget.EditText(ctx)
					bjkd.setHint("药水等级")
					layout.addView(bjkd)
					var n2 = new android.widget.Button(ctx)
					n2.setTextSize(25)
					n2.setText("确定")
					n2.setTextColor(android.graphics.Color.BLACK)
					n2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.WHITE))
					n2.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (bjk.getText() != "" && bjkd.getText() != "") {
								pos = bjk.getText()
								posd = bjkd.getText()
								say("时长已修改为:" + bjk.getText() + " 等级已修改为：" + posd)
								a.dismiss()
								pota.dismiss()
							} else say("错误")
						}
					}))
					layout.addView(n2)
				} catch (err) {
					print(err)
				}
			}
		}))
	}
	var id, count, damage

	function additem(n) {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					var a = new android.app.Dialog(ctx);
					a.setTitle("增加物品");
					a.setContentView(scroll);
					a.show()
					id = new android.widget.EditText(ctx)
					id.setHint("输入物品id")
					layout.addView(id)
					count = new android.widget.EditText(ctx)
					count.setHint("输入数量")
					layout.addView(count)
					damage = new android.widget.EditText(ctx)
					damage.setHint("输入特殊值")
					layout.addView(damage)
					var n3 = new android.widget.Button(ctx)
					n3.setTextSize(21)
					n3.setText("实用物品")
					n3.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							sitems(n)
						}
					}))
					layout.addView(n3)
					var n2 = new android.widget.Button(ctx)
					n2.setTextSize(25)
					n2.setText("确定")
					n2.setTextColor(android.graphics.Color.BLACK)
					n2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.WHITE))
					n2.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (id.getText() != "" || count.getText() != "") {
								Level.dropItem(Entity.getX(n), Entity.getY(n), Entity.getZ(n), 0, id.getText(), count.getText(), damage.getText())
								say("已给<" + Player.getName(n) + "> 加入" + count.getText() + "个，" + Item.getName(id.getText()))
								a.dismiss()
							} else say("错误")
						}
					}))
					layout.addView(n2)
					var j2 = new android.widget.Button(ctx)
					j2.setTextSize(28)
					j2.setText("增加物品时请叫同伴不要动!")
					j2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT))
					layout.addView(j2)
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	function attackHook(p, e) {
		time = timeout - 1
		for (var i = 0; i < nopl1.length; i++) {
			if (p == nopl1[i] && e == nopl2[i]) {
				preventDefault()
			}
		}
	}

	function nosetting(z) {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					var a = new android.app.Dialog(ctx);
					a.setTitle("玩家：" + Player.getName(z) + "要禁止攻击谁？");
					a.setContentView(scroll);
					a.show()
					var p00 = new android.widget.Button(ctx)
					p00.setText(Player.getName(pl[0]))
					p00.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (z != fz) {
								nopl1.push(z)
								nopl2.push(pl[0])
								say("玩家<" + Player.getName(z) + ">已经禁止攻击玩家<" + Player.getName(pl[0]) + ">")
								a.dismiss()
							} else say("不能选择自己")
						}
					}))
					layout.addView(p00)
					var p1 = new android.widget.Button(ctx)
					if (Player.getName(pl[1]) != n) {
						p1.setText(Player.getName(pl[1]))
					} else p1.setText("没有玩家")
					p1.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (pl.length > 1 && Player.getName(pl[1]) != n) {
								nopl1.push(z)
								nopl2.push(pl[1])
								say("玩家<" + Player.getName(z) + ">已经禁止攻击玩家<" + Player.getName(pl[1]) + ">")
								a.dismiss()
							}
						}
					}))
					layout.addView(p1)
					var p2 = new android.widget.Button(ctx)
					if (Player.getName(pl[2]) != n) {
						p2.setText(Player.getName(pl[2]))
					} else p2.setText("没有玩家")
					p2.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (pl.length > 2 && Player.getName(pl[2]) != n) {
								nopl1.push(z)
								nopl2.push(pl[2])
								say("玩家<" + Player.getName(z) + ">已经禁止攻击玩家<" + Player.getName(pl[2]) + ">")
								a.dismiss()
							}
						}
					}))
					layout.addView(p2)
					var p3 = new android.widget.Button(ctx)
					if (Player.getName(pl[3]) != n) {
						p3.setText(Player.getName(pl[3]))
					} else p3.setText("没有玩家")
					p3.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (pl.length > 3 && Player.getName(pl[3]) != n) {
								nopl1.push(z)
								nopl2.push(pl[3])
								say("玩家<" + Player.getName(z) + ">已经禁止攻击玩家<" + Player.getName(pl[3]) + ">")
								a.dismiss()
							}
						}
					}))
					layout.addView(p3)
					var p4 = new android.widget.Button(ctx)
					if (Player.getName(pl[4]) != n) {
						p4.setText(Player.getName(pl[4]))
					} else p4.setText("没有玩家")
					p4.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (pl.length > 4 && Player.getName(pl[4]) != n) {
								nopl1.push(z)
								nopl2.push(pl[4])
								say("玩家<" + Player.getName(z) + ">已经禁止攻击玩家<" + Player.getName(pl[4]) + ">")
								a.dismiss()
							}
						}
					}))
					layout.addView(p4)
					var p5 = new android.widget.Button(ctx)
					if (Player.getName(pl[5]) != n) {
						p5.setText(Player.getName(pl[5]))
					} else p5.setText("没有玩家")
					p5.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (pl.length > 5 && Player.getName(pl[5]) != n) {
								nopl1.push(z)
								nopl2.push(pl[5])
								say("玩家<" + Player.getName(z) + ">已经禁止攻击玩家<" + Player.getName(pl[5]) + ">")
								a.dismiss()
							}
						}
					}))
					layout.addView(p5)
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	function tpwindow(n) {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					var a = new android.app.Dialog(ctx);
					a.setTitle("传送功能");
					a.setContentView(scroll);
					a.show()
					var n1 = new android.widget.Button(ctx)
					n1.setTextSize(25)
					n1.setText("去Ta位置")
					n1.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (n != fz) {
								Entity.setPosition(fz, Entity.getX(n), Entity.getY(n), Entity.getZ(n))
								say("您被传送到<" + Player.getName(n) + ">的位置")
								a.dismiss()
								dia.dismiss()
								settd.dismiss()
							} else {
								say("无法传送")
								a.dismiss()
							}
						}
					}))
					layout.addView(n1)
					var n2 = new android.widget.Button(ctx)
					n2.setTextSize(25)
					n2.setText("召唤Ta过来")
					n2.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (n != fz) {
								var tmob = spawnChicken(Entity.getX(fz), Entity.getY(fz), Entity.getZ(fz))
								rideAnimal(n, tmob)
								ctx.runOnUiThread(new java.lang.Runnable({
									run: function() {
										try {
											var timer = new java.lang.Thread(
												new java.lang.Runnable({
													run: function() {
														while (tmob != null) {
															timer.sleep(700)
															Entity.remove(tmob)
															tmob = null
														}
													}
												}))
											timer.start()
										} catch (err) {
											print(err)
										}
									}
								}))
								say("玩家<" + Player.getName(n) + ">已被召唤到您的位置")
								a.dismiss()
								dia.dismiss()
								settd.dismiss()
							} else {
								say("无法传送");
								a.dismiss()
							}
						}
					}))
					layout.addView(n2)
					var find = new android.widget.Button(ctx)
					find.setText("自动跟踪")
					find.setTextColor(android.graphics.Color.CYAN)
					find.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							if (fz != n) {
								findbutton(n)
								a.dismiss()
								settd.dismiss()
								dia.dismiss()
							} else say("您要跟踪自己？")
						}
					}))
					layout.addView(find)
					var blank = new android.widget.TextView(ctx)
					blank.setText(" ")
					blank.setTextSize(27)
					layout.addView(blank)
					var back = new android.widget.Button(ctx)
					back.setTextSize(30)
					back.setText("返回")
					back.setTextColor(android.graphics.Color.BLACK)
					back.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.WHITE))
					back.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							a.dismiss()
						}
					}))
					layout.addView(back)
				} catch (err) {
					print(err)
				}
			}
		}))
	}
	var showon

	function world() {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					var a = new android.app.Dialog(ctx);
					a.setTitle("管理存档：" + Level.getWorldName());
					a.setContentView(scroll);
					a.show()
					var xg = new android.widget.CheckBox(ctx)
					xg.setChecked(xgc)
					xg.setText("苦力怕爆炸加强")
					xg.setOnClickListener(new android.view.View.OnClickListener() {
						onClick: function(v) {
							if (xgc) {
								xgc = !xgc
							} else xgc = true
						}
					});
					layout.addView(xg);
					/*
					var xgh=new android.widget.CheckBox(ctx)
					xgh.setChecked(xghp)
					xgh.setText("吃食物回血只存档主人有效")
					xgh.setOnClickListener(new android.view.View.OnClickListener() { 
					onClick: function(v){ 
					if(xghp){xghp=false}else xghp=true
					}}); 
					layout.addView(xgh); */
					var n1 = new android.widget.Button(ctx)
					n1.setTextSize(25)
					n1.setWidth(255)
					n1.setText("白天")
					n1.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Level.setTime(0)
						}
					}))
					layout.addView(n1)
					var n2 = new android.widget.Button(ctx)
					n2.setTextSize(25)
					n2.setText("黑天")
					n2.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Level.setTime(13000);
						}
					}))
					layout.addView(n2)
					if (showon != 0 && showon != 1) {
						showon = 1
						ModPE.saveData("生物显血", 1)
					}
					var mode = new android.widget.Button(ctx)
					mode.setText("切换游戏模式")
					mode.setTextColor(android.graphics.Color.CYAN)
					mode.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							a.dismiss()
							if (Level.getGameMode() == 0) {
								Level.setGameMode(1)
								say("创造模式")
							} else {
								Level.setGameMode(0);
								say("生存模式")
							}
						}
					}))
					layout.addView(mode)
					var blank = new android.widget.TextView(ctx)
					blank.setText(" ")
					blank.setTextSize(23)
					layout.addView(blank)
					var text = new android.widget.TextView(ctx)
					text.setText("更多功能即将发布.")
					text.setTextSize(22)
					layout.addView(text)
				} catch (err) {
					print(err)
				}
			}
		}))
	} //////////////*Health Indicators X (By Pencil)*//////
	var MOBS = [{
		id: 10,
		name: "鸡",
		full: "4"
	}, {
		id: 11,
		name: "牛",
		full: "10"
	}, {
		id: 12,
		name: "猪",
		full: "10"
	}, {
		id: 13,
		name: "羊",
		full: "8"
	}, {
		id: 32,
		name: "僵尸",
		full: "20"
	}, {
		id: 33,
		name: "苦力怕",
		full: "16"
	}, {
		id: 34,
		name: "骷髅",
		full: "10"
	}, {
		id: 35,
		name: "蜘蛛",
		full: "8"
	}, {
		id: 36,
		name: "猪人",
		full: "12"
	}, {
		id: 15,
		name: "村民",
		full: "0"
	}, {
		id: 14,
		name: "狼",
		full: "0"
	}, {
		id: 22,
		name: "猫",
		full: "0"
	}, {
		id: 19,
		name: "蝙蝠",
		full: "0"
	}, {
		id: 38,
		name: "末影人",
		full: "0"
	}, {
		id: 20,
		name: "铁傀儡",
		full: "0"
	}, {
		id: 43,
		name: "火妖",
		full: "0"
	}, {
		id: 41,
		name: "妖鬼",
		full: "0"
	}]
	var COLORS_NAME = ["白", "灰", "深灰", "黄", "金", "绿", "深绿", "青", "深蓝", "蓝", "蓝黑", "紫", "深紫", "红", "深红"]
	var COLORS = ["§f", "§7", "§8", "§e", "§6", "§a", "§2", "§b", "§3", "§9", "§1", "§d", "§5", "§c", "§4"]
	//var COLORS=["",ChatColor.GRAY,ChatColor.DARK_GRAY,ChatColor.YELLOW,ChatColor.GOLD,ChatColor.GREEN,ChatColor.DARK_GREEN,ChatColor.AQUA,ChatColor.DARK_AQUA,ChatColor.BLUE,ChatColor.DARK_BLUE,ChatColor.LIGHT_PURPLE,ChatColor.DARK_PURPLE,ChatColor.RED,ChatColor.DARK_RED]
	var time = 0
	var timeout = 20
	var divider = " "
	var deathWord = "死亡"
	var mobs = new Array()

	function read(str) {
		return Number(ModPE.readData(str))
	}

	function Mob(ent, name, full, color) {
		this.ent = ent
		this.name = name
		this.full = full
		this.color = color
		this.hcolor = ChatColor.WHITE
		if (Mob.prototype.update == null) Mob.prototype.update = function() {
			var heal = Entity.getHealth(this.ent)
			Entity.setNameTag(this.ent, this.color + this.name + this.hcolor + divider + (heal <= 0 ? deathWord : heal + "/" + this.full))
		}
	}

	function showDialogxheqlth() {
		var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					new android.app.AlertDialog.Builder(ctx)
						.setTitle("体力查看器设置")
						.setItems(["颜色", "显示模式", "更新", "语言设置"], new android.content.DialogInterface.OnClickListener() {
							onClick: function(dialog, which) {
								try {
									switch (which) {
										case 0:
											var NAMES = new Array()
											for (var i in MOBS)
												NAMES.push(MOBS[i].name)
											new android.app.AlertDialog.Builder(ctx)
												.setTitle("选择生物")
												.setPositiveButton("返回", new android.content.DialogInterface.OnClickListener() {
													onClick: function() {}
												})
												.setItems(NAMES, new android.content.DialogInterface.OnClickListener() {
													onClick: function(d0, w0) {
														new android.app.AlertDialog.Builder(ctx)
															.setTitle(MOBS[w0].name)
															.setSingleChoiceItems(COLORS_NAME, read("v1 color" + w0), new android.content.DialogInterface.OnClickListener() {
																onClick: function(d1, w1) {
																	ModPE.saveData("v1 color" + w0, w1.toString())
																	d1.dismiss()
																	d0.show()
																}
															})
															.show()
													}
												})
												.show()
											break
										case 1:
											new android.app.AlertDialog.Builder(ctx)
												.setSingleChoiceItems(["单行", "双行"], read("v1 doubleLine"), new android.content.DialogInterface.OnClickListener() {
													onClick: function(d0, w0) {
														ModPE.saveData("v1 doubleLine", w0.toString())
														d0.dismiss()
													}
												})
												.show()
											break
										case 2:
											var text = new android.widget.EditText(ctx)
											text.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL)
											text.setText((timeout / 20).toString())
											new android.app.AlertDialog.Builder(ctx)
												.setMessage("输入回血间隙时间（秒）\n最小为0.05秒\n� 立即生效")
												.setView(text)
												.setPositiveButton("采用", new android.content.DialogInterface.OnClickListener() {
													onClick: function() {
														var num = parseInt(Number(text.getText()) * 20)
														timeout = num > 0 ? num : 1
														ModPE.saveData("v1 timeout", timeout)
													}
												})
												.show()
											break
										case 3:
											new android.app.AlertDialog.Builder(ctx)
												.setSingleChoiceItems(["English", "中文"], read("v1 eng"), new android.content.DialogInterface.OnClickListener() {
													onClick: function(d0, w0) {
														ModPE.saveData("v1 eng", w0.toString())
														d0.dismiss()
													}
												})
												.show()
									}
								} catch (err) {
									print(err)
								}
							}
						})
						.setPositiveButton("确定", new android.content.DialogInterface.OnClickListener() {
							onClick: function() {
								new android.os.Handler().postDelayed(new java.lang.Runnable({
									run: function() {
										stkMessage("请重启启动器来使改变生效")
									}
								}), 1000)
							}
						})
						.show()
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	function givemenu(n, z) {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					var a = new android.app.Dialog(ctx);
					if (z == 1) {
						a.setTitle("盔甲与武器")
					} else if (z == 2) {
						a.setTitle("方块");
					} else if (z == 3) a.setTitle("食物");
					a.setContentView(scroll);
					a.show()
					if (z == 3) {
						var n1 = new android.widget.Button(ctx)
						n1.setTextSize(25)
						n1.setText("熟猪肉")
						n1.setOnClickListener(new android.view.View.OnClickListener({
							onClick: function(v) {
								id.setText("320")
								count.setText("1")
								damage.setText("0")
								a.dismiss()
							}
						}))
						layout.addView(n1)
						var n2 = new android.widget.Button(ctx)
						n2.setTextSize(25)
						n2.setText("熟鸡肉")
						n2.setOnClickListener(new android.view.View.OnClickListener({
							onClick: function(v) {
								id.setText("366")
								count.setText("1")
								damage.setText("0")
								a.dismiss()
							}
						}))
						layout.addView(n2)
						var n3 = new android.widget.Button(ctx)
						n3.setTextSize(25)
						n3.setText("苹果")
						n3.setOnClickListener(new android.view.View.OnClickListener({
							onClick: function(v) {
								id.setText("260")
								count.setText("1")
								damage.setText("0")
								a.dismiss()
							}
						}))
						layout.addView(n3)
						var n4 = new android.widget.Button(ctx)
						n4.setTextSize(25)
						n4.setText("蛋糕")
						n4.setOnClickListener(new android.view.View.OnClickListener({
							onClick: function(v) {
								id.setText("354")
								count.setText("1")
								damage.setText("0")
								a.dismiss()
							}
						}))
						layout.addView(n4)
					}
				} catch (err) {
					print(err)
				}
			}
		}))
	}
	var sid

	function sitems(n) {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					sid = new android.app.Dialog(ctx);
					sid.setTitle("实用物品");
					sid.setContentView(scroll);
					sid.show()
					/*
					var n1=new android.widget.Button(ctx)
					n1.setTextSize(25)
					n1.setText("盔甲与武器")
					n1.setOnClickListener(new android.view.View.OnClickListener({
					onClick:function(v){
					givemenu(n,1)
					sid.dismiss()
					}}))
					layout.addView(n1)
					var n2=new android.widget.Button(ctx)
					n2.setTextSize(25)
					n2.setText("方块")
					n2.setOnClickListener(new android.view.View.OnClickListener({
					onClick:function(v){
					givemenu(n,2)
					sid.dismiss()
					}}))
					layout.addView(n2)
					*/
					var n3 = new android.widget.Button(ctx)
					n3.setTextSize(25)
					n3.setText("食物")
					n3.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							givemenu(n, 3)
							sid.dismiss()
						}
					}))
					layout.addView(n3)
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	function spawnwindow(n) {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					var a = new android.app.Dialog(ctx);
					a.setTitle("在 " + Player.getName(n) + " 位置生成：");
					a.setContentView(scroll);
					a.show()
					var n1 = new android.widget.Button(ctx)
					n1.setText("箭")
					n1.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Level.spawnMob(Entity.getX(n), Entity.getY(n) + 2, Entity.getZ(n), EntityType.ARROW)
							say("已生成到 " + Player.getName(n) + " 位置!")
						}
					}))
					layout.addView(n1)
					var n2 = new android.widget.Button(ctx)
					n2.setText("火妖")
					n2.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Level.spawnMob(Entity.getX(n), Entity.getY(n), Entity.getZ(n), EntityType.BLAZE)
							say("已生成到 " + Player.getName(n) + " 位置!")
						}
					}))
					layout.addView(n2)
					var n3 = new android.widget.Button(ctx)
					n3.setText("苦力怕")
					n3.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Level.spawnMob(Entity.getX(n), Entity.getY(n), Entity.getZ(n), EntityType.CREEPER)
							say("已生成到 " + Player.getName(n) + " 位置!")
						}
					}))
					layout.addView(n3)
					var n4 = new android.widget.Button(ctx)
					n4.setText("妖鬼")
					n4.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Level.spawnMob(Entity.getX(n), Entity.getY(n), Entity.getZ(n), EntityType.GHAST)
							say("已生成到 " + Player.getName(n) + " 位置!")
						}
					}))
					layout.addView(n4)
					var n5 = new android.widget.Button(ctx)
					n5.setText("铁傀儡")
					n5.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							Level.spawnMob(Entity.getX(n), Entity.getY(n), Entity.getZ(n), EntityType.IRON_GOLEM)
							say("已生成到 " + Player.getName(n) + " 位置!")
						}
					}))
					layout.addView(n5)
					var n6 = new android.widget.Button(ctx)
					n6.setText("僵尸猪人")
					n6.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							say("已生成到 " + Player.getName(n) + " 位置!")
							Level.spawnMob(Entity.getX(n), Entity.getY(n), Entity.getZ(n), EntityType.PIG_ZOMBIE)
						}
					}))
					layout.addView(n6)
					var n7 = new android.widget.Button(ctx)
					n7.setText("骷髅")
					n7.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							say("已生成到 " + Player.getName(n) + " 位置!")
							Level.spawnMob(Entity.getX(n), Entity.getY(n), Entity.getZ(n), EntityType.SKELETON)
						}
					}))
					layout.addView(n7)
					var n8 = new android.widget.Button(ctx)
					n8.setText("蜘蛛")
					n8.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							say("已生成到 " + Player.getName(n) + " 位置!")
							Level.spawnMob(Entity.getX(n), Entity.getY(n), Entity.getZ(n), EntityType.SPIDER)
						}
					}))
					layout.addView(n8)
					var n9 = new android.widget.Button(ctx)
					n9.setText("僵尸")
					n9.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							say("已生成到 " + Player.getName(n) + " 位置!")
							Level.spawnMob(Entity.getX(n), Entity.getY(n), Entity.getZ(n), EntityType.ZOMBIE)
						}
					}))
					layout.addView(n9)
					var n10 = new android.widget.Button(ctx)
					n10.setText("狼")
					n10.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							say("已生成到 " + Player.getName(n) + " 位置!")
							Level.spawnMob(Entity.getX(n), Entity.getY(n), Entity.getZ(n), EntityType.WOLF)
						}
					}))
					layout.addView(n10)
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	function explodeHook(entity, x, y, z, power, onFire) {
		if (xgc == true) {
			if (Entity.getEntityTypeId(entity) == 33) {
				explode(x, y, z, 5)
			}
		}
	}

	function getName(n) {
		return Player.getName(n).substr(0, 5)
	}

	function getOriName(n) {
		return Player.getName(n).substr(5, Player.getName(n).length)
	}

	function chatReceiveHook(str, sender) {
		var cmd = str.split(" ")
		for (var getall in admins) {
			if (Player.getName(admins[getall]) == sender) {
				clientMessage("1")
				if (cmd[0] == "#time") {
					if (cmd[1] == "1") {
						Level.setTime(1000)
					} else if (cmd[1] == "0") {
						Level.setTime(14000)
					}
				}
				if (cmd[0] == "#kick") {
					for (var plg in pl) {
						if (cmd[1] == Player.getName(pl[plg])) {
							Entity.remove(pl[plg])
						}
					}
				}
			}
		}
	}

	function newInfo() {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var dialog = new android.app.AlertDialog.Builder(ctx)
					dialog.setTitle("玩家管理V" + version + "-新功能介绍")
					dialog.setMessage("玩家管理V" + version + "增加了 寻找队友功能\n但是你还不知道怎么用吧？\n\n自动跟踪系统 使用说明\n-自动跟踪功能将会在 传送与跟踪功能里 看到，点击跟踪按钮后 您的玩家将会自动跑到 您要跟踪的玩家，到达终点后 玩家自动会停下来\n不过如果您想要让 [走/停] 按钮消失，直接长按即可。")
					dialog.setPositiveButton("明白", new android.content.DialogInterface.OnClickListener() {
						onClick: function(dia, w) {
							/*点确定时执行*/
						}
					})
					dialog.show()
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	var buttonimg = "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\n"

	function butway() {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var dialog = new android.app.AlertDialog.Builder(ctx)
					dialog.setTitle("选择打开菜单按钮类型")
					dialog.setNegativeButton("返回", new android.content.DialogInterface.OnClickListener() {
						onClick: function(dia, w) {
							/*点取消时执行*/
						}
					})
					dialog.setItems(new java.lang.String("MC按钮,文本按钮").split(","), new android.content.DialogInterface.OnClickListener() {
						onClick: function(dia, w) {
							buttontype = w
							gui.dismiss()
							buttonl()
							ModPE.saveData("按钮类型", w)
						}
					})
					dialog.show()
				} catch (err) {
					print(err)
				}
			}
		}))
	}
	var fbutton = null
	var gofind = false
	var goe = null

	function findbutton(n) {
		var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					var button = new android.widget.Button(ctx);
					button.setText("寻找:" + Player.getName(n) + "\n走/停");
					button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(75, 42, 2, 3)));
					button.setOnClickListener(new android.view.View.OnClickListener() {
						onClick: function(v) {
							if (gofind) {
								gofind = false
								goe = null
							} else {
								gofind = true
								goe = n
							}
						}
					});
					button.setOnLongClickListener(new android.view.View.OnLongClickListener() {
						onLongClick: function(v) {
							gofind = false
							goe = null
							fbutton.dismiss()
							say("寻找功能已取消")
							ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(40);
							return true
						}
					});
					layout.addView(button);
					fbutton = new android.widget.PopupWindow(layout, dip2px(ctx, 45), dip2px(ctx, 45));
					fbutton.setContentView(layout);
					fbutton.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
					fbutton.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
					fbutton.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 300);
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	function jsetting() {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				try {
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll = new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					var a = new android.app.Dialog(ctx);
					a.setTitle("JS设置");
					a.setContentView(scroll);
					a.show()
					var healthshow = new android.widget.Button(ctx)
					if (showon == 1) {
						healthshow.setText("生物体力显示:开启中")
					}
					if (showon == 0) {
						healthshow.setText("生物体力显示:关闭中")
					}
					healthshow.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							say("重启存档将生效(不是游戏)")
							if (showon == 0) {
								healthshow.setText("生物体力显示:开启中")
								showon = 1
								ModPE.saveData("生物显血", 1)
							} else {
								healthshow.setText("生物体力显示:关闭中")
								showon = 0
								ModPE.saveData("生物显血", 0)
							}
						}
					}))
					layout.addView(healthshow)
					var type = new android.widget.Button(ctx)
					type.setText("选择按钮类型")
					type.setWidth(255)
					type.setTextColor(android.graphics.Color.CYAN)
					type.setOnClickListener(new android.view.View.OnClickListener({
						onClick: function(v) {
							butway()
						}
					}))
					layout.addView(ns)
				} catch (err) {
					print(err)
				}
			}
		}))
	}

	say("玩家管理V" + version + "加载成功")
} catch (err) {
	print("玩家管理V" + version + "加载失败")
}