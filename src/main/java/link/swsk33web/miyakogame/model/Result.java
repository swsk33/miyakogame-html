package link.swsk33web.miyakogame.model;

import java.io.Serializable;

public class Result<T> implements Serializable {

	private static final long serialVersionUID = 1L;

	private int code;

	private boolean success = false;

	private String message;

	private T data;

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public void setResultSuccess(String msg, T data) {
		this.success = true;
		this.code = 600;
		this.message = msg;
		this.data = data;
	}

	public void setResultFailed(String msg) {
		this.success = false;
		this.code = 601;
		this.message = msg;
	}

}