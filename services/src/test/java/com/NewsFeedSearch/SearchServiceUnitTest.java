package com.NewsFeedSearch;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.NewsFeedSearch.Entity.SearchHistory;
import com.NewsFeedSearch.Repository.SearchRepo;
import com.NewsFeedSearch.Service.SearchService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SearchServiceUnitTest 
{
	@InjectMocks
	private SearchService searchService;
	
	@Mock
	private SearchRepo searchRepo;
	
	@Before
	public void init()
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void saveSearchTest()
	{
		SearchHistory search = new SearchHistory();
		search.setSearchTopic("test");
		search.setUserId("cts@gmail.com");
		
		when(searchRepo.save(search)).thenReturn(search);
		
		assertEquals("Search saved successfully!",searchService.saveSearchService(search));
	}
	
	@Test
	public void showSearchTest()
	{
		List<SearchHistory> expectedList = (List<SearchHistory>)searchRepo.findAllByUserId("cts@gmail.com");
		
		when(searchRepo.findAllByUserId("cts@gmail.com")).thenReturn(expectedList);
		
		assertEquals(expectedList,searchService.showSearchService("cts@gmail.com"));
	}
	
	@Test
	public void deleteSearchTest()
	{
		searchService.deleteSearchService(135);
		verify(searchRepo,times(1)).deleteById(135);
		
	}
}
