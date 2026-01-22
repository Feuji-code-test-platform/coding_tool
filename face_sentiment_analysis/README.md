# face_sentiment_analysis
Project deals with face recognition with sentiment analysis for the detection of fraudulant or proctoring of candidate


## High level architecture

ai_proctored_assessment_platform/
│
├── frontend/
│   ├── recruiter/
│   │   ├── Login.tsx
│   │   ├── CreateAssessment.tsx        # job role, stack, difficulty
│   │   ├── QuestionSelection.tsx        # select 3 of 12
│   │   ├── CandidateUpload.tsx          # single / bulk
│   │   └── AssessmentDashboard.tsx
│   │
│   ├── candidate/
│   │   ├── CandidateLogin.tsx
│   │   ├── Instructions.tsx
│   │   ├── ConsentPage.tsx
│   │   ├── CodingExam.tsx               # IDE + webcam
│   │   └── SubmissionSuccess.tsx
│   │
│   ├── shared/
│   │   ├── auth/
│   │   ├── api/
│   │   └── ui_components/
│
├── backend-java/
│   ├── auth-service/
│   │   ├── RecruiterAuthController.java
│   │   └── CandidateAuthController.java
│   │
│   ├── assessment-service/
│   │   ├── AssessmentController.java
│   │   ├── AssessmentService.java
│   │   ├── QuestionSelector.java
│   │   └── AssessmentRepository.java
│   │
│   ├── question-service/
│   │   ├── QuestionController.java
│   │   ├── AiQuestionClient.java        # calls Python LLM service
│   │   └── QuestionRepository.java
│   │
│   ├── candidate-service/
│   │   ├── CandidateController.java
│   │   ├── CandidateBulkUploader.java
│   │   └── InvitationService.java
│   │
│   ├── exam-session-service/
│   │   ├── ExamSessionController.java
│   │   ├── SessionManager.java
│   │   ├── ConsentManager.java
│   │   └── SubmissionHandler.java
│   │
│   ├── proctoring-service/
│   │   ├── ProctoringOrchestrator.java
│   │   ├── BrowserEventReceiver.java
│   │   ├── VisionSignalClient.java      # calls Python CV service
│   │   └── FraudRuleEngine.java
│   │
│   ├── evaluation-service/
│   │   ├── CodeEvaluationController.java
│   │   ├── SandboxExecutor.java
│   │   └── EvaluationAggregator.java
│   │
│   ├── reporting-service/
│   │   ├── ReportController.java
│   │   ├── RiskScoreCalculator.java
│   │   └── FinalReportGenerator.java
│   │
│   └── common/
│       ├── dto/
│       ├── security/
│       └── utils/
│
├── ai-python/
│   ├── vision-proctoring/
│   │   ├── app.py                       # FastAPI
│   │   ├── face_gaze_headpose.py        
│   │   └── fraud_signals.py
│   │
│   ├── question-generation/
│   │   ├── app.py
│   │   └── llm_question_agent.py
│   │
│   ├── code-evaluation/
│   │   ├── static_analysis.py
│   │   ├── llm_code_reviewer.py
│   │   └── sandbox_runner.py
│   │
│   └── llm_providers/
│       ├── openai_client.py
│       ├── bedrock_llama_client.py
│       └── model_router.py
│
├── infrastructure/
│   ├── sandbox/
│   ├── video_recordings/
│   ├── audit_logs/
│   └── deployment/
│
└── README.md

