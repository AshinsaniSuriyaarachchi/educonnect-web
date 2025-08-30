package educonnect.v1.service.impl;

import educonnect.v1.dto.UniversityDTO;
import educonnect.v1.dto.UniversityStatus;
import educonnect.v1.dto.request.ApiRequest;
import educonnect.v1.dto.response.ApiResponse;
import educonnect.v1.entity.University;
import educonnect.v1.entity.User;
import educonnect.v1.exception.EduConnectValidationsException;
import educonnect.v1.repository.UniversityRepository;
import educonnect.v1.repository.UserRepository;
import educonnect.v1.service.UniversityService;
import educonnect.v1.util.Messages;
import educonnect.v1.util.RequestStatus;
import educonnect.v1.util.ResponseCodes;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UniversityServiceImpl implements UniversityService {

    @Autowired
    UniversityRepository universityRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    Messages messages;

    private static final Logger logger = LoggerFactory.getLogger(UniversityServiceImpl.class);

    @Override
    public ApiResponse save(MultipartFile logo, MultipartFile ugcLetter, ApiRequest apiRequest) {
        logger.info("University Save Starts");

        ApiResponse apiResponse = new ApiResponse();

        try {
            // Validate request
            if (apiRequest == null || apiRequest.getUniversityDTO() == null || apiRequest.getUserId() == null) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMandatoryValidationFailureMessage("ApiRequest or University"));
            }

            UniversityDTO universityDTO = apiRequest.getUniversityDTO();

            if (universityDTO.getUniversityName() == null || universityDTO.getDescription() == null) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMessageForResponseCode(ResponseCodes.UNIVERSITY_DETAILS_MISSED, null));
            }

            // Validate logo
            if (universityDTO.getLogo() != null) {
                validateLogo(universityDTO.getLogo(), universityDTO.getLogoContentType());
            }
            universityDTO.setLogo(logo.getBytes());
            universityDTO.setUgcLetter(ugcLetter.getBytes());
            universityDTO.setLogoContentType(logo.getContentType());
            Optional<User> optionalUser = userRepository.findById(apiRequest.getUserId());

            if (optionalUser.isEmpty()) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMessageForResponseCode(ResponseCodes.USER_NOT_FOUND, null));
            }

            // University map and save
            University university = modelMapper.map(universityDTO, University.class);
            university.setUser(optionalUser.get());
            university.setUniversityStatus(UniversityStatus.PENDING);

            University savedUniversity = universityRepository.save(university);
            apiResponse.setUniversity(savedUniversity);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.UNIVERSITY_SAVE_SUCCESS, null));

        } catch (EduConnectValidationsException exception) {
            logger.error("University Save Validation Failure", exception);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(exception.getCode());
            apiResponse.setMessage(exception.getMessage());
        } catch (Exception e) {
            logger.error("University Save Validation Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.UNIVERSITY_SAVE_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.UNIVERSITY_SAVE_FAILED, null));
        }

        logger.info("University Save Ends");
        return apiResponse;
    }

    @Override
    public ApiResponse getAllUniversities() {
        logger.info("Fetching all universities starts");

        ApiResponse apiResponse = new ApiResponse();

        try {
            // Find universities by status
            List<University> universities = universityRepository.findUniversitiesByUniversityStatus(UniversityStatus.APPROVED);

            // Set response
            apiResponse.setUniversityList(universities);
            apiResponse.setStatus(RequestStatus.SUCCESS.getStatus());
            apiResponse.setResponseCode(ResponseCodes.SUCCESS);

        } catch (Exception e) {
            logger.error("Error fetching universities", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.FETCH_UNIVERSITIES_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.FETCH_UNIVERSITIES_FAILED, null));
        }

        logger.info("Fetching all universities ends");
        return apiResponse;
    }

    @Override
    public ApiResponse getRequestedUniversities() {
        logger.info("Get Requested Universities Starts");

        ApiResponse apiResponse = new ApiResponse();

        try {
            // Find universities by status
            List<University> universities = universityRepository.findUniversitiesByUniversityStatus(UniversityStatus.PENDING);
            apiResponse.setUniversityList(universities);

        } catch (Exception e) {
            logger.error("Get Requested Universities Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.FETCH_UNIVERSITIES_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.FETCH_UNIVERSITIES_FAILED, null));
        }

        logger.info("Get Requested Universities Ends");
        return apiResponse;
    }

    @Override
    public ApiResponse getAllApprovedOrRejectedUniversities() {
        logger.info("Fetching all universities starts");

        ApiResponse apiResponse = new ApiResponse();

        try {
            // Find universities by status
            List<University> universities = universityRepository.findUniversitiesByNotUniversityStatus(UniversityStatus.PENDING);

            // Set response
            apiResponse.setUniversityList(universities);
            apiResponse.setStatus(RequestStatus.SUCCESS.getStatus());
            apiResponse.setResponseCode(ResponseCodes.SUCCESS);

        } catch (Exception e) {
            logger.error("Error fetching universities", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.FETCH_UNIVERSITIES_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.FETCH_UNIVERSITIES_FAILED, null));
        }

        logger.info("Fetching all universities ends");
        return apiResponse;
    }

    @Override
    @Transactional
    public ApiResponse approveUniversity(ApiRequest apiRequest) {
        logger.info("University Approve Starts");

        ApiResponse apiResponse = new ApiResponse();
        try {
            // University find and update status
            Optional<University> optionalUniversity = universityRepository.findById(apiRequest.getUniversityId());
            if (optionalUniversity.isPresent()) {
                optionalUniversity.get().setUniversityStatus(UniversityStatus.APPROVED);
                University savedUniversity = universityRepository.save(optionalUniversity.get());
                apiResponse.setUniversity(savedUniversity);
            } else {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMessageForResponseCode(ResponseCodes.UNIVERSITY_NOT_FOUND, null));
            }
        } catch (EduConnectValidationsException exception) {
            logger.error("University Approve Validation Failure", exception);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(exception.getCode());
            apiResponse.setMessage(exception.getMessage());
        } catch (Exception e) {
            logger.error("University Approve Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.UNIVERSITY_APPROVE_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.UNIVERSITY_APPROVE_FAILED, null));
        }

        logger.info("University Approve Ends");
        return apiResponse;
    }

    @Override
    @Transactional
    public ApiResponse rejectUniversity(ApiRequest apiRequest) {
        logger.info("University Reject Starts");

        ApiResponse apiResponse = new ApiResponse();
        try {
            // University find and update status
            Optional<University> optionalUniversity = universityRepository.findById(apiRequest.getUniversityId());
            if (optionalUniversity.isPresent()) {
                optionalUniversity.get().setUniversityStatus(UniversityStatus.REJECTED);
                University savedUniversity = universityRepository.save(optionalUniversity.get());
                apiResponse.setUniversity(savedUniversity);
            } else {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMessageForResponseCode(ResponseCodes.UNIVERSITY_NOT_FOUND, null));
            }
        } catch (EduConnectValidationsException exception) {
            logger.error("University Reject Validation Failure", exception);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(exception.getCode());
            apiResponse.setMessage(exception.getMessage());
        } catch (Exception e) {
            logger.error("University Reject Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.UNIVERSITY_REJECT_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.UNIVERSITY_REJECT_FAILED, null));
        }

        logger.info("University Reject Ends");
        return apiResponse;
    }

    private void validateLogo(byte[] logo, String contentType) {
        // Validate file size (e.g., max 5MB)
        if (logo.length > 5 * 1024 * 1024) {
            throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                    messages.getMessageForResponseCode(ResponseCodes.LOGO_SIZE_EXCEEDED, null));
        }

        // Validate content type
        List<String> allowedTypes = Arrays.asList("image/jpeg", "image/png", "image/gif");
        if (!allowedTypes.contains(contentType)) {
            throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                    messages.getMessageForResponseCode(ResponseCodes.INVALID_LOGO_FORMAT, null));
        }
    }

}
