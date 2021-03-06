package fun.swsk33site.miyakogame.service;

import fun.swsk33site.miyakogame.model.Result;
import fun.swsk33site.miyakogame.param.MailServiceType;
import org.springframework.stereotype.Service;

@Service
public interface MailService {

	/**
	 * 发送通知邮件，为异步方法
	 *
	 * @param email 收件人
	 * @param title 邮件标题
	 * @param text  邮件正文
	 */
	void sendNotifyMail(String email, String title, String text);

	/**
	 * 发送验证码
	 *
	 * @param email  邮箱
	 * @param userId 待操作用户id
	 * @param type   服务类型
	 */
	Result sendCode(String email, Integer userId, MailServiceType type);

}