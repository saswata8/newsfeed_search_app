package com.NewsFeedSearch.Service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NewsFeedSearch.Entity.SearchHistory;
import com.NewsFeedSearch.Repository.SearchRepo;

@Service
public class SearchService 
{
	private static final Logger logger = LoggerFactory.getLogger(SearchService.class);
	
	@Autowired
	private SearchRepo searchRepo;
	
	public String saveSearchService(SearchHistory search)
	{
		logger.info("Inside SaveSearchService");
		logger.info(search.getSearchTopic());
		searchRepo.save(search);
		
		return "Search saved successfully!";
	}
	
	public List<SearchHistory> showSearchService(String email)
	{
		logger.info("Inside showSearchService");
		List<SearchHistory> list = (List<SearchHistory>)searchRepo.findAllByUserId(email);
		return list;
	}
	
	public String deleteSearchService(int searchId)
	{
		searchRepo.deleteById(searchId);
		return "Search deleted successfully!";
	}
}
