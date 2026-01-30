package com.feuji.codetestbackend.controller;

import com.feuji.codetestbackend.dto.JobDescriptionRequestDto;
import com.feuji.codetestbackend.dto.JobDescriptionResponseDto;
import com.feuji.codetestbackend.service.JobDescriptionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/job-descriptions")
public class JobDescriptionController {

    private final JobDescriptionService jobDescriptionService;

    public JobDescriptionController(JobDescriptionService jobDescriptionService) {
        this.jobDescriptionService = jobDescriptionService;
    }

    @PostMapping
    public ResponseEntity<JobDescriptionResponseDto> create(@Valid @RequestBody JobDescriptionRequestDto requestDto) {
        JobDescriptionResponseDto created = jobDescriptionService.create(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDescriptionResponseDto> getById(@PathVariable Long id) {
        JobDescriptionResponseDto response = jobDescriptionService.getById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<JobDescriptionResponseDto>> getAll() {
        List<JobDescriptionResponseDto> all = jobDescriptionService.getAll();
        return ResponseEntity.ok(all);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobDescriptionResponseDto> update(@PathVariable Long id,
                                                            @Valid @RequestBody JobDescriptionRequestDto requestDto) {
        JobDescriptionResponseDto updated = jobDescriptionService.update(id, requestDto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        jobDescriptionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

