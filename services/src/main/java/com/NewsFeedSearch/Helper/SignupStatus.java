package com.NewsFeedSearch.Helper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



/**
 * @author 729712
 *
 */
public class SignupStatus 
{
	private static final Logger logger = LoggerFactory.getLogger(SignupStatus.class);
	private boolean signUpStatus;
	private boolean emailExistStatus;
	
	
	public SignupStatus()
	{
		
	}
	
	public SignupStatus(boolean signUpStatus, boolean emailExistStatus)
	{
		this.signUpStatus = signUpStatus;
		this.emailExistStatus = emailExistStatus;
	}

	public boolean isSignUpStatus() {
		return signUpStatus;
	}

	@Override
	public boolean equals(Object obj) {
		SignupStatus ob = (SignupStatus)obj;
		if(this.isSignUpStatus()==ob.isSignUpStatus())
			if(this.isEmailExistStatus()==ob.isEmailExistStatus())
				return true;
		return false;
	}

	public void setSignUpStatus(boolean signUpStatus) {
		this.signUpStatus = signUpStatus;
	}

	public boolean isEmailExistStatus() {
		return emailExistStatus;
	}

	public void setEmailExistStatus(boolean emailExistStatus) {
		this.emailExistStatus = emailExistStatus;
	}
	
	
}
