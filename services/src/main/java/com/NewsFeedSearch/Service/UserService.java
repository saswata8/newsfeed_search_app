package com.NewsFeedSearch.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.NewsFeedSearch.Entity.User;
import com.NewsFeedSearch.Helper.SignupStatus;
import com.NewsFeedSearch.Repository.UserRepo;

/**
 * @author 729712
 *
 */
@Service
public class UserService implements UserDetailsService
{
	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired 
	private UserRepo uRepo;
	
	@Autowired
	private PasswordEncoder encoder;
	
	public ResponseEntity<?> registerUser(User user)
	{
		logger.info("Service start");
		SignupStatus status = new SignupStatus();
		if(uRepo.existsById(user.getEmail()))
		{
			//System.out.println("gfgf");
			status.setEmailExistStatus(true);
			status.setSignUpStatus(false);
			logger.error("Signup failure");
			return new ResponseEntity<>("Fail->Username already exists.",HttpStatus.CONFLICT);
		}
		
		else
		{
			status.setEmailExistStatus(false);
			status.setSignUpStatus(true);
			user.setPassword(encoder.encode(user.getPassword()));
			user.setRole("ROLE_User");
			user.setStatus(true);
			//String email = uRepo.save(user).getEmail();
			uRepo.save(user);
			logger.info("Signup success");
			return new ResponseEntity<>("User successfully registered! Please login!",HttpStatus.OK);
		}
		
		
	}
	
	public User getUser(String email)
	{
		User user;
		if(uRepo.existsById(email)){
			try{
			user= uRepo.findById(email).get();
			}catch(NoSuchElementException e){
				return null;
			}}
		else
			return null;
		return user;
	}
	@Override
	public UserDetails loadUserByUsername(String email)
	{
		logger.info("inside loadUserByUsername");
		User user = uRepo.findById(email).get();
		List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
		roles.add(new SimpleGrantedAuthority(user.getRole()));
		org.springframework.security.core.userdetails.User user1=new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(), roles);
		return user1;
	}
	
	public List<User> searchUserService(String searchText)
	{
		List<User> list = uRepo.searchUser(searchText);
		return list;
	}
	
	public String blacklistUserService(String email)
	{
		User user = uRepo.findById(email).orElse(null);
		if(user!=null)
		{
			user.setStatus(false);
			uRepo.save(user);
		}
		return "User blacklisted!";
	}
	
	public List<User> getAllUser()
	{
		List<User> list = (List<User>) uRepo.findAllByRole();
		return list;
	}
}
