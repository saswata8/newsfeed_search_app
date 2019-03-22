package com.NewsFeedSearch;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.NewsFeedSearch.Entity.SearchHistory;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserAndAdminServicesTest 
{
	private MockMvc mockMvc;
	
	@Autowired
	private WebApplicationContext context;
	
	ObjectMapper objMapper;
	SearchHistory search;
	@Before
	public void setup()
	{
		mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
		objMapper = new ObjectMapper();
		search = new SearchHistory();
	}
	
	@Test
	@WithMockUser(roles="User")
	public void testForSuccessfulShowSearchHistory() throws Exception
	{
		mockMvc.perform(get("/user/showSearch/cts@gmail.com")
						.contentType("application/json;charset=UTF-8"))
						.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	@WithMockUser(roles="ADMIN")
	public void testForUnsuccessfulShowSearchHistory() throws Exception
	{
		mockMvc.perform(get("/user/showSearch/cts@gmail.com")
						.contentType("application/json;charset=UTF-8"))
						.andExpect(MockMvcResultMatchers.status().isUnauthorized());
	}
	
	@Test
	@WithMockUser(roles="User")
	public void testForSuccessfulSaveSearch() throws Exception
	{
		search.setUserId("cts@gmail.com");
		search.setSearchTopic("kohli");
		mockMvc.perform(post("/user/saveSearch")
						.content(objMapper.writeValueAsString(search))
						.contentType("application/json;charset=UTF-8"))
						.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	@WithMockUser(roles="ADMIN")
	public void testForUnsuccessfulSaveSearch() throws Exception
	{
		search.setUserId("cts@gmail.com");
		search.setSearchTopic("kohli");
		mockMvc.perform(post("/user/saveSearch")
						.content(objMapper.writeValueAsString(search))
						.contentType("application/json;charset=UTF-8"))
						.andExpect(MockMvcResultMatchers.status().isUnauthorized());
	}
	
//	@Test
//	@WithMockUser(roles="User")
//	public void testForSuccessfulDeleteSearch() throws Exception
//	{
//		mockMvc.perform(delete("/user/deleteSearch/92")
//						.contentType("application/json;charset=UTF-8"))
//						.andExpect(MockMvcResultMatchers.status().isOk());
//	}
	
	@Test
	@WithMockUser(roles="ADMIN")
	public void testForUnsuccessfulDeleteSearch() throws Exception
	{
		mockMvc.perform(delete("/user/deleteSearch/92")
						.contentType("application/json;charset=UTF-8"))
						.andExpect(MockMvcResultMatchers.status().isUnauthorized());
	}
	
	@Test
	@WithMockUser(roles="ADMIN")
	public void testForSuccessfulSearchUser() throws Exception
	{
		mockMvc.perform(get("/admin/searchUser/da")
						.contentType("application/json;charset=UTF-8"))
						.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	@WithMockUser(roles="User")
	public void testForUnsuccessfulSearchUser() throws Exception
	{
		mockMvc.perform(get("/admin/searchUser/da")
						.contentType("application/json;charset=UTF-8"))
						.andExpect(MockMvcResultMatchers.status().isUnauthorized());
	}
	
	@Test
	@WithMockUser(roles="ADMIN")
	public void testForSuccessfulBlacklistUser() throws Exception
	{
		mockMvc.perform(get("/admin/blacklistUser/hada@gmail.com")
						.contentType("application/json;charset=UTF-8"))
						.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	@WithMockUser(roles="User")
	public void testForUnsuccessfulBlacklistUser() throws Exception
	{
		mockMvc.perform(get("/admin/blacklistUser/hada@gmail.com")
						.contentType("application/json;charset=UTF-8"))
						.andExpect(MockMvcResultMatchers.status().isUnauthorized());
	}
	
	@Test
	@WithMockUser(roles="ADMIN")
	public void testForSuccessfulGetAllUser() throws Exception
	{
		mockMvc.perform(get("/admin/getAllUser")
						.contentType("application/json;charset=UTF-8"))
						.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	@WithMockUser(roles="User")
	public void testForUnsuccessfulGetAllUser() throws Exception
	{
		mockMvc.perform(get("/admin/getAllUser")
						.contentType("application/json;charset=UTF-8"))
						.andExpect(MockMvcResultMatchers.status().isUnauthorized());
	}
}
