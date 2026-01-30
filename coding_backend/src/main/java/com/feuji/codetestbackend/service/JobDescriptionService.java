package com.feuji.codetestbackend.service;

import com.feuji.codetestbackend.dto.JobDescriptionRequestDto;
import com.feuji.codetestbackend.dto.JobDescriptionResponseDto;

import java.util.List;

public interface JobDescriptionService {

    JobDescriptionResponseDto create(JobDescriptionRequestDto requestDto);

    JobDescriptionResponseDto getById(Long id);

    List<JobDescriptionResponseDto> getAll();

    JobDescriptionResponseDto update(Long id, JobDescriptionRequestDto requestDto);

    void delete(Long id);
}

