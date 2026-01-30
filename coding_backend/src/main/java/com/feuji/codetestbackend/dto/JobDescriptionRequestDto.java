package com.feuji.codetestbackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class JobDescriptionRequestDto {

    @NotBlank(message = "Job title is required")
    @Size(max = 255, message = "Job title must be at most 255 characters")
    private String jobTitle;

    @NotBlank(message = "Company is required")
    @Size(max = 255, message = "Company must be at most 255 characters")
    private String company;

    @NotBlank(message = "Job description text is required")
    private String jobDescription;

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

