package com.NewsFeedSearch;


import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.NewsFeedSearch.Entity.User;
import com.NewsFeedSearch.Repository.UserRepo;
import com.NewsFeedSearch.Service.UserService;

public class UserServiceUnitTest 
{
	@InjectMocks
	private UserService uservice;
	
	@Mock
	private UserRepo urepo;
	
	@Mock
	private PasswordEncoder encoder;
	
	@Before
	public void init()
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void registerFailureForEmailExists() throws Exception
	{
		User user = new User();
		user.setEmail("cts@gmail.com");
		user.setName("hada");
		user.setPassword("Admin@123");
		
		when(urepo.existsById(user.getEmail())).thenReturn(true);
		ResponseEntity<?> response = uservice.registerUser(user);

		assertEquals(409,response.getStatusCodeValue()); 
	}
	
	@Test
	public void registerSuccess() throws Exception
	{
		User user = new User();
		user.setEmail("cts@gmail.com");
		user.setName("hada");
		user.setPassword("Admin@123");
		when(urepo.save(user)).thenReturn(user);
		
		when(urepo.existsById(user.getEmail())).thenReturn(false);
		ResponseEntity<?> response = uservice.registerUser(user);

		assertEquals(200,response.getStatusCodeValue()); 
	}
	
	@Test
	public void searchUserTest()
	{
		List<User> expectedList = urepo.searchUser("da");
		
		when(urepo.searchUser("da")).thenReturn(expectedList);
		
		assertEquals(expectedList,uservice.searchUserService("da"));
	}
	
	@Test
	public void blacklistUserTest()
	{
		User user = new User();
		user.setEmail("cts@gmail.com");
		user.setName("cts");
		user.setPassword("Admin@123");
		user.setRole("ROLE_User");
		user.setStatus(true);
		
		when(urepo.findById("cts@gmail.com")).thenReturn(Optional.of(user));
		when(urepo.save(user)).thenReturn(user);
		
		assertEquals("User blacklisted!",uservice.blacklistUserService("cts@gmail.com"));
	}
	
	@Test
	public void getAllUserTest()
	{
		List<User> expectedList = urepo.findAllByRole();
		
		when(urepo.findAllByRole()).thenReturn(expectedList);
		
		assertEquals(expectedList,uservice.getAllUser());
	}
}
