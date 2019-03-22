package com.NewsFeedSearch.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.NewsFeedSearch.Entity.User;

/**
 * @author 729712
 *
 */
public interface UserRepo extends CrudRepository<User,String>
{
	@Query("Select u from User u where u.email like %:searchText%")
	public List<User> searchUser(@Param("searchText") String searchText);
	
	@Query("select u from User u where u.role='ROLE_User'")
	public List<User> findAllByRole();
}

