package com.NewsFeedSearch.Entity;



import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * @author 729712
 * 
 */
@Entity
public class User 
{
	@Id
	@NotBlank(message="Email can't be empty")
	@Pattern(regexp="^[A-Za-z0-9._-]+@[A-Za-z0-9]+\\.[A-Za-z]{2,4}$", message="Not a valid email")
	private String email;
	
	@NotBlank(message="Name can't be empty")
	@Size(min=2, max=30, message="Name must be between 2 and 30 characters")
	@Pattern(regexp="^[a-zA-Z]+$", message="Name should contain only alphabets")
	private String name;
	
	@NotBlank(message="Password can't be empty")
	@Size(min=8, message="Password must be above 8 characters")
	@Pattern(regexp="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%&*]).{8,}$", message="Password must contain at least 1 capital letter, 1 small letter, 1 special character and 1 digit")
	private String password;
	
	private String role;
	
	private boolean status;
	
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
