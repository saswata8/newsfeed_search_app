package com.NewsFeedSearch.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author 729712
 *
 */
public class ExceptionController 
{
	String errorMessage="";
	private static final Logger logger = LoggerFactory.getLogger(ExceptionController.class);
	@ExceptionHandler(Exception.class)
	@ResponseStatus(code=HttpStatus.BAD_REQUEST)
	public ResponseEntity<?> exceptionHandler(Exception ex)
	{
		logger.info("Exception Handler Start");
		logger.error(ex.getMessage());
		errorMessage = "Invalid input data:";
		if(ex instanceof MethodArgumentNotValidException)
		{
			MethodArgumentNotValidException exceptions = (MethodArgumentNotValidException) ex;
			
			BindingResult bindingResult = exceptions.getBindingResult();
			
			List<FieldError> fieldError = bindingResult.getFieldErrors();
			
			fieldError.stream().forEach(err -> {errorMessage+=err.getDefaultMessage() + "\n\t\t\t\t\t";});
			
			return new ResponseEntity<>(errorMessage,HttpStatus.FORBIDDEN);
		}
		
		if(ex instanceof BadCredentialsException)
		{
			 return new ResponseEntity<>("Please enter correct username/password",HttpStatus.BAD_REQUEST);
		}
		 
		if(ex instanceof AccessDeniedException)
			 return new ResponseEntity<>("You should not be here! Get out!",HttpStatus.UNAUTHORIZED);
		
		logger.info("Exception Handler End");
		return new ResponseEntity<>("System Error! Please try again later.",HttpStatus.NOT_FOUND);
	}
}
