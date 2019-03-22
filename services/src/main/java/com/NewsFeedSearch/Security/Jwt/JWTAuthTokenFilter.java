package com.NewsFeedSearch.Security.Jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.NewsFeedSearch.Service.UserService;

public class JWTAuthTokenFilter extends OncePerRequestFilter
{
	
	private static final Logger logger = LoggerFactory.getLogger(JWTAuthTokenFilter.class);
	
	@Autowired
	private JWTAuthProvider jwtAuthProvider;
	
	@Autowired
	private UserService userService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException
	{
		logger.info("Inside doFilter");
		try
		{
			String jwt = getJwt(request);
			
			if(jwt != null && jwtAuthProvider.validateJwtToken(jwt))
			{
				String username = jwtAuthProvider.getUserNameFromJwtToken(jwt);

				UserDetails userDetails = userService.loadUserByUsername(username);
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		} catch (Exception e) {
			logger.error("Can NOT set user authentication -> Message: {}", e);
		}

		filterChain.doFilter(request, response);
	}
		
	private String getJwt(HttpServletRequest request)
	{
		logger.info("Inside getJwt");
		String authHeader = request.getHeader("Authorization");
		logger.info(authHeader);
		if(authHeader!=null && authHeader.startsWith("Bearer"))
		{
			return authHeader.replace("Bearer ", "");
		}
		return null;
	}
}
