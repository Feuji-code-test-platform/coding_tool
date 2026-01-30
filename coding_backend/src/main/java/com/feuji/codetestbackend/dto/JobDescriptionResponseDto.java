package com.feuji.codetestbackend.dto;

public class JobDescriptionResponseDto {

    private Long id;
    private String jobTitle;
    private String company;
    private String jobDescription;

    public JobDescriptionResponseDto() {
    }

    public JobDescriptionResponseDto(Long id, String jobTitle, String company, String jobDescription) {
        this.id = id;
        this.jobTitle = jobTitle;
        this.company = company;
        this.jobDescription = jobDescription;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }
}

