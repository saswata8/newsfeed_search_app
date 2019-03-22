package com.NewsFeedSearch.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.NewsFeedSearch.Entity.SearchHistory;

public interface SearchRepo extends CrudRepository<SearchHistory,Integer> 
{
	public List<SearchHistory> findAllByUserId(String email);
}
