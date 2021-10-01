// @ts-ignore
import {Wechaty, Contact} from "/wechaty";
import {
	QRCodeTerminal,
	EventLogger,
	FriendshipAccepter,
	RoomInvitationAccepter
} from "wechaty-plugin-contrib";
import plugins from "./plugins";

const onLogin = (user: Contact) => {
	// 通知机器人主人登录成功
	console.log(`onLogin:`, user);
};
const onLogOut = (user: Contact) => {
	// 通知机器人主人退出登录
	console.log(`onLogOut:`, user);
};

const onError = (err: any, isExit: boolean = false) => {
	// 通知机器人主人发生错误
	console.log(`发生错误,请及时处理${isExit ? "程序将会退出" : ""}:`, err);
};

async function run() {
	const bot = Wechaty.instance({ name: "wechat-bot" });
	bot.use([
		QRCodeTerminal(),
		EventLogger(),
		FriendshipAccepter(),
		RoomInvitationAccepter(),
		...plugins
	]);
	bot.on("login", onLogin).on("logout", onLogOut).on("error", onError);
	await bot.start();
}

run().catch(err => {
	onError(err, true);
	process.exit();
});
