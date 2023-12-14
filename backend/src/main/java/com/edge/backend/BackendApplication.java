package com.edge.backend;

import com.edge.backend.models.specification.Specification;
import com.edge.backend.repositories.RoleRepository;
import com.edge.backend.services.JsonImportUtils;
import com.edge.backend.services.JsonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

	// fetch data from json file
	/*
	@Autowired
	private JsonService jsonService;
	@Autowired
	private RoleRepository roleRepository;
	*/

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	/*
	@Bean
	CommandLineRunner run() {
		return args -> {

			String collection = "testing";
			String source = "static/db.jsonl";
			List<String> jsonLines = new ArrayList<>();


			jsonLines = JsonImportUtils.linesFromResource(source);

			// simple string
			//String result = jsonService.importTo(collection,jsonLines);
			String result = jsonService.importTo(Specification.class,jsonLines);

		};
	}
	*/

	@Bean
	public CorsFilter corsFilter() {

		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);

		//corsConfiguration.setAllowedOrigins(Arrays.asList("*"));
		corsConfiguration.setAllowedOrigins(Arrays.asList("https://localhost:4200", "https://localhost:80", "https://localhost", "https://127.0.0.1","https://127.0.0.1:80", 
														  "http://localhost:4200", "http://localhost:80", "http://localhost", "http://127.0.0.1","http://127.0.0.1:80",
														  "https://car-trader.uk.to", "http://car-trader.uk.to"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
		corsConfiguration.setExposedHeaders(Arrays.asList("*"));

		
		
		/*
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Jwt-Token", "Authorization", "Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));

		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Filename"));

		*/
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}

}
