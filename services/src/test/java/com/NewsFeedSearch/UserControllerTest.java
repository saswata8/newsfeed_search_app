package com.NewsFeedSearch;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.NewsFeedSearch.Entity.User;



@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest 
{
	@Autowired
	private WebApplicationContext webApplicationContext;
	
	private MockMvc mockMvc;
	ObjectMapper objectMapper;
	
	User user;
	@Before
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
		user = new User();
		user.setEmail("test" + Math.floor(Math.random()*89) + "@gmail.com");
		user.setName("Saswata");
		user.setPassword("Admin@123");
		objectMapper=new ObjectMapper();
	}
	
	@Test
	public void testForSuccessfulSignup() throws Exception {
		
		mockMvc.perform(post("/user/register")
				.content(objectMapper.writeValueAsString(user))
				.contentType("application/json;charset=UTF-8"))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	public void testForUnsuccessfulSignup() throws Exception {
		
		user.setEmail("cts@gmail.com");
		user.setName("Saswata");
		user.setPassword("Admin@123");
		
		mockMvc.perform(post("/user/register")
				.content(objectMapper.writeValueAsString(user))
				.contentType("application/json;charset=UTF-8"))
				.andExpect(MockMvcResultMatchers.status().isConflict());
	}
	
	@Test
	public void testForEmptyName() throws Exception
	{
		user.setName("");
		user.setEmail("hnsajkd@gmail.com");
		user.setPassword("hds#454HGH");
		mockMvc.perform(post("/user/register")
				.content(objectMapper.writeValueAsString(user))
				.contentType("application/json;charset=UTF-8"))
				.andExpect(MockMvcResultMatchers.status().isForbidden())
				.andExpect(content().string(containsString("Name can't be empty")));
	}
	
	@Test
	public void testForInvalidName() throws Exception
	{
		user.setName("saswata123");
		user.setEmail("hnsajkd@gmail.com");
		user.setPassword("hds#454HGH");
		mockMvc.perform(post("/user/register")
				.content(objectMapper.writeValueAsString(user))
				.contentType("application/json;charset=UTF-8"))
				.andExpect(MockMvcResultMatchers.status().isForbidden())
				.andExpect(content().string(containsString("Name should contain only alphabets")));
	}
	
	@Test
	public void testForTooSmallName() throws Exception
	{
		user.setName("s");
		user.setEmail("hnsajkd@gmail.com");
		user.setPassword("hds#454HGH");
		mockMvc.perform(post("/user/register")
				.content(objectMapper.writeValueAsString(user))
				.contentType("application/json;charset=UTF-8"))
				.andExpect(MockMvcResultMatchers.status().isForbidden())
				.andExpect(content().string(containsString("Name must be between 2 and 30 characters")));
	}
	
	@Test
	public void testForEmptyEmail() throws Exception
	{
		user.setName("Saswata");
		user.setEmail("");
		user.setPassword("hds#454HGH");
		mockMvc.perform(post("/user/register")
				.content(objectMapper.writeValueAsString(user))
				.contentType("application/json;charset=UTF-8"))
				.andExpect(MockMvcResultMatchers.status().isForbidden())
				.andExpect(content().string(containsString("Email can't be empty")));
	}
	
	@Test
	public void testForInvalidEmail() throws Exception
	{
		user.setName("Saswata");
		user.setEmail("");
		user.setPassword("hds#454HGH");
		mockMvc.perform(post("/user/register")
				.content(objectMapper.writeValueAsString(user))
				.contentType("application/json;charset=UTF-8"))
				.andExpect(MockMvcResultMatchers.status().isForbidden())
				.andExpect(content().string(containsString("Not a valid email")));
	}
	
	@Test
	public void testForEmptyPassword() throws Exception
	{
		user.setName("Saswata");
		user.setEmail("hada@gmail.com");
		user.setPassword("");
		mockMvc.perform(post("/user/register")
				.content(objectMapper.writeValueAsString(user))
				.contentType("application/json;charset=UTF-8"))
				.andExpect(MockMvcResultMatchers.status().isForbidden())
				.andExpect(content().string(containsString("Password can't be empty")));
	}
	
	@Test
	public void testForInvalidPassword() throws Exception
	{
		user.setName("Saswata");
		user.setEmail("hada@gmail.com");
		user.setPassword("fnjksd@ghjfdjs12");
		mockMvc.perform(post("/user/register")
				.content(objectMapper.writeValueAsString(user))
				.contentType("application/json;charset=UTF-8"))
				.andExpect(MockMvcResultMatchers.status().isForbidden())
				.andExpect(content().string(containsString("Password must contain at least 1 capital letter, 1 small letter, 1 special character and 1 digit")));
	}
	
	@Test
	public void testForTooSmallPassword() throws Exception
	{
		user.setName("Saswata");
		user.setEmail("hada@gmail.com");
		user.setPassword("fnjk");
		mockMvc.perform(post("/user/register")
				.content(objectMapper.writeValueAsString(user))
				.contentType("application/json;charset=UTF-8"))
				.andExpect(MockMvcResultMatchers.status().isForbidden())
				.andExpect(content().string(containsString("Password must be above 8 characters")));
	}
	
	@Test
	public void testForSuccessfulLogin() throws Exception
	{
		user.setEmail("hada@gmail.com");
		user.setPassword("Admin@123");
		mockMvc.perform(post("/user/login")
				.content(objectMapper.writeValueAsString(user))
				.contentType("application/json;charset=UTF-8"))
				.andExpect(MockMvcResultMatchers.status().isOk());
				
	}
	
	@Test
	public void testForUnsuccessfulLogin() throws Exception
	{
		user.setEmail("hada@gmail.com");
		user.setPassword("Admin@123fsgfd");
		mockMvc.perform(post("/user/login")
				.content(objectMapper.writeValueAsString(user))
				.contentType("application/json;charset=UTF-8"))
				.andExpect(MockMvcResultMatchers.status().isBadRequest());
				
	}
	
	
}
