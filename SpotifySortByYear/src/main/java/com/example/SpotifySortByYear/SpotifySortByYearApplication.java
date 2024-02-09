package com.example.SpotifySortByYear;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Comparator;

@SpringBootApplication
public class SpotifySortByYearApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpotifySortByYearApplication.class, args);
	}

}

@Controller
class SpotiSort{
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String getHome(){
		return "index";
	}
	@RequestMapping(value = "/", method = RequestMethod.POST)
	@ResponseBody
	public String postHome(@RequestBody(required = false) Map<String, String> inData){
		ArrayList<String[]> songs = new ArrayList<>();
		for(Map.Entry<String, String> entry : inData.entrySet()){
			songs.add(new String[]{entry.getKey(), entry.getValue()});
		}
		songs.sort(Comparator.comparing((String[] song) -> song[1]).thenComparing(song -> song[0]));
		String result = "";
		for(String[] song : songs){
			result += song[0] + " : " + song[1] + "\n";
		}
		return result;
	}
}