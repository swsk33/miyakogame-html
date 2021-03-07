package swsk33.game.miyakoeatpuddings.model;

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

}