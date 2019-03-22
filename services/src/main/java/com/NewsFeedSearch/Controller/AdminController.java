package com.NewsFeedSearch.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NewsFeedSearch.Entity.User;
import com.NewsFeedSearch.Service.UserService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("admin")
public class AdminController extends ExceptionController
{
	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
	private UserService userService;
	
	@GetMapping("searchUser/{searchText}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public List<User> searchUser(@PathVariable("searchText") String searchText)
	{
		logger.info("Inside Admin SearchUser");
		return userService.searchUserService(searchText);
	}
	
	@GetMapping("blacklistUser/{email}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public String blacklistUser(@PathVariable("email") String email)
	{
		logger.info("Inside Admin BlacklistUser");
		return userService.blacklistUserService(email);
	}
	
	@GetMapping("getAllUser")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public List<User> getAllUser()
	{
		logger.info("Inside Admin GetAllUser");
		return userService.getAllUser();
	}
}
