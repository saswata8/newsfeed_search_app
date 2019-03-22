package com.NewsFeedSearch.Controller;


import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NewsFeedSearch.Entity.JwtResponse;
import com.NewsFeedSearch.Entity.SearchHistory;
import com.NewsFeedSearch.Entity.User;
import com.NewsFeedSearch.Security.Jwt.JWTAuthProvider;
import com.NewsFeedSearch.Service.SearchService;
import com.NewsFeedSearch.Service.UserService;



/**
 * @author 729712
 *
 */
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("user")
public class UserController extends ExceptionController
{
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	@Autowired
	private UserService uservice;
	
	@Autowired 
	private AuthenticationManager authManager;
	
	@Autowired 
	private JWTAuthProvider jwtprovider;
	
	@Autowired
	private SearchService searchService;
	
//	@GetMapping("test")
//	public void test(){
//		System.out.println("test");
//	}
	@PostMapping("register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user)
	{
		logger.info("inside register controller");
		
		return uservice.registerUser(user);	
	}
	
	@PostMapping("login")
	public ResponseEntity<?> loginUser(@RequestBody User user,HttpServletResponse response)
	{
		logger.info("inside login controller");
		
		Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		String jwt = jwtprovider.generateJwtToken(auth);
		
		UserDetails userDetails = (UserDetails)auth.getPrincipal();
		
		response.addHeader("token", jwt);
		
		if(uservice.getUser(user.getEmail()).isStatus() == false)
		{
			jwt = null;
			return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
		}
		
		else
			
			return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
	}
	
	@PostMapping("saveSearch")
	@PreAuthorize("hasRole('ROLE_User')")
	public String saveSearch(@RequestBody SearchHistory search)
	{
		logger.info("Inside SaveSearchController");
		return searchService.saveSearchService(search);
	}
	
	@GetMapping("showSearch/{email}")
	@PreAuthorize("hasRole('ROLE_User')")
	public List<SearchHistory> showSearch(@PathVariable("email") String email)
	{
		logger.info("Inside showSearch");
		return searchService.showSearchService(email);
	}
	
	@DeleteMapping("deleteSearch/{searchId}")
	@PreAuthorize("hasRole('ROLE_User')")
	public String deleteSearch(@PathVariable("searchId") int searchId)
	{
		logger.info("Inside deleteSearch");
		return searchService.deleteSearchService(searchId);
	}
}
