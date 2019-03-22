package com.NewsFeedSearch.Security.Jwt;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

/**
 * @author 729712
 *
 */
@Component
public class JWTAuthProvider 
{
	private static final Logger logger = LoggerFactory.getLogger(JWTAuthProvider.class);
	
	@Value("${grokonez.app.jwtSecret}")
    private String jwtSecret;
	
	@Value("${grokonez.app.jwtExpiration}")
    private int jwtExpiration;
	
	public String generateJwtToken(Authentication auth)
	{
		logger.info("inside generateJwtToken");
		UserDetails userDetails = (UserDetails) auth.getPrincipal();
		return Jwts.builder()
				 .setSubject((userDetails.getUsername()))
	             .setIssuedAt(new Date())
	             .setExpiration(new Date((new Date()).getTime() + jwtExpiration*1000))
	             .signWith(SignatureAlgorithm.HS512, jwtSecret)
	             .compact();		
	}
	
	public boolean validateJwtToken(String jwt)
	{
		logger.info("inside validateJwtToken");
		try
		{
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwt);
			return true;
		}
		catch(SignatureException e)
		{
			logger.error("Invalid JWT signature -> Message: {} ", e);
        } 
		catch (MalformedJwtException e) 
		{
            logger.error("Invalid JWT token -> Message: {}", e);
        } 
		catch (ExpiredJwtException e) 
		{
            logger.error("Expired JWT token -> Message: {}", e);
        } 
		catch (UnsupportedJwtException e) 
		{
            logger.error("Unsupported JWT token -> Message: {}", e);
        } 
		catch (IllegalArgumentException e) 
		{
            logger.error("JWT claims string is empty -> Message: {}", e);
        }
		return false;
	}
	
	public String getUserNameFromJwtToken(String token)
	{
		logger.info("inside getUsernameFromjwtToken");
		return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody().getSubject();
	}
}
