package com.example.demo.models;
import java.util.List;
public class TutorResponse {
    private String response;
    private List<String> suggestedFollowUps;
    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }
    public List<String> getSuggestedFollowUps() { return suggestedFollowUps; }
    public void setSuggestedFollowUps(List<String> suggestedFollowUps) { this.suggestedFollowUps = suggestedFollowUps; }
}

