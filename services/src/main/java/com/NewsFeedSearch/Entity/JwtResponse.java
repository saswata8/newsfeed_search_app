package com.NewsFeedSearch.Entity;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

/**
 * @author 729712
 *
 */
public class JwtResponse 
{
	private String token;
	private String username;
	private Collection<? extends GrantedAuthority> authorities;
	public JwtResponse(){
		
	}
	
	public JwtResponse(String token, String username, Collection<? extends GrantedAuthority> authorities) 
	{
		
		this.token = token;
		this.username = username;
		this.authorities = authorities;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}
	
	
}
