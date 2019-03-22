package com.NewsFeedSearch.Entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class SearchHistory 
{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int searchHistoryId;
	
	@NotBlank
	private String searchTopic;
	
	@CreationTimestamp
	private LocalDateTime searchTime;
	
	private String userId;
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getSearchHistoryId() {
		return searchHistoryId;
	}

	public void setSearchHistoryId(int searchHistoryId) {
		this.searchHistoryId = searchHistoryId;
	}

	public String getSearchTopic() {
		return searchTopic;
	}

	public void setSearchTopic(String searchTopic) {
		this.searchTopic = searchTopic;
	}

	public LocalDateTime getSearchTime() {
		return searchTime;
	}

	public void setSearchTime(LocalDateTime searchTime) {
		this.searchTime = searchTime;
	}
	
	
}
