package com.feuji.codetestbackend.serviceimple;

import com.feuji.codetestbackend.dto.JobDescriptionRequestDto;
import com.feuji.codetestbackend.dto.JobDescriptionResponseDto;
import com.feuji.codetestbackend.model.JobDescription;
import com.feuji.codetestbackend.repo.JobDescriptionRepository;
import com.feuji.codetestbackend.service.JobDescriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobDescriptionServiceImpl implements JobDescriptionService {

    private final JobDescriptionRepository jobDescriptionRepository;

    public JobDescriptionServiceImpl(JobDescriptionRepository jobDescriptionRepository) {
        this.jobDescriptionRepository = jobDescriptionRepository;
    }

    @Override
    public JobDescriptionResponseDto create(JobDescriptionRequestDto requestDto) {
        JobDescription jobDescription = new JobDescription(
                requestDto.getJobTitle(),
                requestDto.getCompany(),
                requestDto.getJobDescription()
        );
        JobDescription saved = jobDescriptionRepository.save(jobDescription);
        return toResponseDto(saved);
    }

    @Override
    public JobDescriptionResponseDto getById(Long id) {
        JobDescription jobDescription = jobDescriptionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job description not found with id " + id));
        return toResponseDto(jobDescription);
    }

    @Override
    public List<JobDescriptionResponseDto> getAll() {
        return jobDescriptionRepository.findAll().stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public JobDescriptionResponseDto update(Long id, JobDescriptionRequestDto requestDto) {
        JobDescription existing = jobDescriptionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job description not found with id " + id));

        existing.setJobTitle(requestDto.getJobTitle());
        existing.setCompany(requestDto.getCompany());
        existing.setJobDescription(requestDto.getJobDescription());

        JobDescription saved = jobDescriptionRepository.save(existing);
        return toResponseDto(saved);
    }

    @Override
    public void delete(Long id) {
        if (!jobDescriptionRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Job description not found with id " + id);
        }
        jobDescriptionRepository.deleteById(id);
    }

    private JobDescriptionResponseDto toResponseDto(JobDescription entity) {
        return new JobDescriptionResponseDto(
                entity.getId(),
                entity.getJobTitle(),
                entity.getCompany(),
                entity.getJobDescription()
        );
    }
}

