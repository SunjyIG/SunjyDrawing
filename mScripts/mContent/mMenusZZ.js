var mMenuTree=new menutree("mMenuTree","main")
mMenuTree.addNode("首页","../../mHtmls/mContent/mFrameRgt.html")
	mMenuTree.addFolder("Excel 文件汇总")
		mMenuTree.addNode("建立模板文件","SxyNewTmp.htm")
		mMenuTree.addNode("定义汇总区域","SxySetFun.htm")
		mMenuTree.addNode("查看定义区域","SxyFunVie.htm")
		mMenuTree.addNode("进行汇总处理","SxyTotals.htm")
		mMenuTree.addNode("查看汇总结果","SxyTolVie.htm")
	mMenuTree.endFolder()

mMenuTree.addFolder("其他","",false)
	mMenuTree.addNode("荷花","SxyLianhu.htm")

	var myskinnumber=Math.floor(Math.random()*2)+1;
	if(myskinnumber==1)
	{
	mMenuTree.addNode("音乐","SxyWMPMusicPlayerControl.htm")
	}
	else
	{
	mMenuTree.addNode("音乐","SxyMusic.htm")
	}

	//mMenuTree.addNode("音乐","SxyMusic.htm")
	mMenuTree.addNode("图片","SxyPictu.htm")
	mMenuTree.addNode("打印","SxyPrint.htm")
	mMenuTree.addNode("Web 文件编辑","SxyEdit.htm")
	mMenuTree.addNode("文件显示器","myFolderFileViewer.htm")
	mMenuTree.addFolder("杂项","",false)
		mMenuTree.addNode("公历阴历对照","SxyRiLi.htm")
		mMenuTree.addFolder("网页特效","",false)
			mMenuTree.addNode("特效-01","myTxBc/myWeb/001.htm")
			mMenuTree.addNode("特效-02","myTxBc/myWeb/002.htm")
			//mMenuTree.addNode("特效-03","myTxBc/myWebTx/myWeb/004.htm")
			//mMenuTree.addNode("特效-04","myTxBc/myWebTx/myWeb/005.htm")
		mMenuTree.endFolder()
	mMenuTree.endFolder()
mMenuTree.endFolder()
mMenuTree.init()
top.document.title="Sun"; 

