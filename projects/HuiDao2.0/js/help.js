/*搜索功能*/
var resultNum=new Array();
var results=new Array();
results[0]="汇道是什么?有什么用处?:汇道是一个在企业移动化过程中，提供移动服务接入的开放性云服务平台，由服务管理平台、服务内容定制平台、移动端 SDK 三部分组成。服务商可以通过汇道快速接入自己的服务内容，以低成本获得服务和品牌的曝光；渠道商可以精准的发现并整合本行业的优质服务，提高服务品质。通过连接各领域的渠道资源和服务内容的方式，为行业用户提供一套完整的移动服务解决方案。";
results[1]="如何注册汇道帐号?:汇道账号可通过邮箱注册，填写邮箱密码，对邮箱进行验证，最后进行下信息登记，即可成功注册汇道。推送地址指的是你的应用里的消息推送地址，方便你及时处理来自用户的消息。注册时提供的身份证信息仅供平台认证使用，请放心提交。信息提交后，我们会尽快对信息进行审核，并将结果发送到你的账号邮箱，该过程最多不超过两个工作日，请留意下邮件。";
results[2]="什么是渠道商和服务商?:渠道商是指拥有某个领域或行业入口的渠道提供者，通常已拥有自己的移动终端，并建立起了自己的用户体系，如原生 APP等。通过汇道，渠道商可以获取平台上丰富的服务资源并能够自由的对这些资源进行配置，从而为用户提供丰富多样的服务。服务商指拥有着优质线下资源的服务提供者。和开发独立的 APP 相比，服务商更希望让更多的用户在细分市场发现自己的服务。通过汇道，服务商就可以把自己的服务分配给多个渠道商使用，借助渠道让自己的服务到达更多的用户面前。";
results[3]="如何修改个人信息?:在「渠道商信息」里，你可以修改你的账号信息，查看你的 ID 以及 AppKey等。";
results[4]="怎样邀请你的第一个服务商?:登录汇道后，你可以点击右上角「创建」，填写服务商信息并完成创建，在服务商列表页面，对该服务商完成认证。服务商也可以自己创建账号并提交给你审核，如果你发现服务商的资格有问题，在查看详情页面最下方-认证信息，选择认证不通过，同时在弹出框里告知对方哪里还有问题。当服务商获得认证后，对方就可以登录后台并创建服务。你需要对服务的内容进行审核，是否符合规范。别忘记启用符合规范的服务，启用状态的服务才可以被平台检索、分配以及使用。";
results[5]="怎么构建你的第一个服务?:在「服务管理」页，你可以清楚的查看来自不同渠道的服务：自有服务是你自己创建的并属于你的服务（不包含你帮助服务商创建的服务），渠道服务是你邀请的服务商创建的及其所属的服务，分配服务是汇道分配给你使用的服务。你可以点击右上角「创建」，填写服务基本信息完成服务注册，已注册的服务还需要进行认证和启用。渠道商可自行对服务进行认证和启用，服务商需要提交给渠道商进行认证和启用。每个服务都会有多个组件，用来在服务中直接使用。汇道默认提供多个行业组件，方便你创建服务时直接使用，当然，你也可以自行开发更多的组件。在注册了服务后，点击「定制」，即可进入服务内容定制页面，在这里，你可以快速搭建起服务页面，丰富的模板+所见即所得的方式会让你非常方便的完成内容定制。";
results[6]="如何对你的服务进行分组?:当服务变得多起来以后，不同类型的服务你可以对其进行分类。点击分组卡片上的详情，即可对分组信息进行重新编辑，点击服务管理，还可以添加和移除服务。";
results[7]="怎样把服务接入你的APP?: 在汇道上创建的服务都是可以接入到你自己的移动应用上的，比如你的 APP。将我们的文档（链接到文档页面： https://218.80.250.91:8443/octopus/views/doc.jsp ）内容发给你团队的开发人员，根据文档的要求，他们就可以快速的完成服务接入了。";
results[8]="如何修改注册信息？:登录汇道，右侧导航栏找到渠道商信息/服务商信息，点击编辑按钮，你可以对信息进行修改。需要注意的是，名称和联系人信息不可更改。";
results[9]="我的服务会被哪些人看到？:在汇道上每个服务都有对应的唯一渠道商，所有注册的服务仅服务创建者和所属的渠道商可见。而等服务接入到移动应用后，就可以面向该应用的全部用户群体。";
results[10]="启用服务是什么意思？:启用服务是对服务的可用性进行管理，当服务接入到 APP 以后，启用状态的服务即为可用服务，未启用的服务会保留原页面，但不再提供服务。";
results[11]="组件是什么？我如何使用？:组件就像一个个已经打磨好的零部件，可以让你很方便的组装到应用里。汇道目前已提供了数十种覆盖各行业的组件供你使用。当然，如果研发资源充沛，你也可以自行开发。";
results[12]="如何使用消息推送通道？:使用场景:服务后台接到客户的消息后，往往不能及时应答，为了应对此种情况，平台提供了“渠道商”客服消息推送通道服务。使用步骤：注册：需要在注册“渠道商”信息的时候填写“客服消息推送地址”，这个“客服消息推送地址”的存在方式是一个http协议的url连接，后续的服务端客服消息会被推送到这个地址。推送：平台收到需要推送的客服消息时，会按照一参数定格式post至“客服消息推送地址”，具体的参数包含header、和body二进制流：头消息参数(会作为post请求中的header部分参数) ";
results[12]+="序号 参数名 类型 释义 是否必须 sid sname msgcontent cid appkey String 服务id 服务名称 推送的消息字符串(概述) 客服消息所推送用户隶属的渠道商id 客服消息所推送用户隶属的渠道商appkey 是";
results[12]+="二进制流参数  客服消息数据字符串转换得到的数据流  反馈:“客服消息推送地址”服务收到客服消息后(后续可以通过自身消息渠道将消息发送至移动端相关服务)，在成功接收后需要反馈一个成功或失败的字符串给平台。成功接收反馈 success 失败反馈 fail";
results[12]+="SDK端插入消息:渠道商通过自身渠道将客服消息推送到移动端，移动端接收到客服消息后，可以调用sdk方法将数据加载进相关的服务内。public boolean setCustomServiceMessage(String sid,String customServiceMsg)";
function helpsearch(){
	var n=0,num=0;
	var searchText=$.trim($("#searchText").val().toString()); //S.trim()函数是去掉字符串首位空格
	if(searchText==""){
		num=0;
	}else{
		var regExp=new RegExp(searchText,"g");
		for(var i=0;i<results.length;i++){
			if(regExp.test(results[i])){
				resultNum[n++]=i;
			}
		}
		num=n;
		n=0;
	}
	
	$.cookie("num", num, {path : "/"});
	$.cookie("resultNum", resultNum, {path : "/"});
	window.location.href = "helpResult.html";

}

$("#searchBtn").click(function(){
	helpsearch();
	
});


/*新手引导*/

$("#leadItemA").click(function(){
	$("#leadModalA").modal("show");
});

$("#leadItemB").click(function(){
	$("#leadModalB").modal("show");
});

$("#leadItemC").click(function(){
	$("#leadModalC").modal("show");
});

$("#leadItemD").click(function(){
	$("#leadModalD").modal("show");
});

$("#leadItemE").click(function(){
	$("#leadModalE").modal("show");
});

$("#leadItemF").click(function(){
	$("#leadModalF").modal("show");
});

$("#leadItemG").click(function(){
	$("#leadModalG").modal("show");
});

$("#leadItemH").click(function(){
	$("#leadModalH").modal("show");
});


/*FAQ*/
$("#AQItemA").click(function(){
	$("#AQModalA").modal("show");
});

$("#AQItemB").click(function(){
	$("#AQModalB").modal("show");
});

$("#AQItemC").click(function(){
	$("#AQModalC").modal("show");
});

$("#AQItemD").click(function(){
	$("#AQModalD").modal("show");
});

$("#AQItemE").click(function(){
	$("#AQModalE").modal("show");
});
