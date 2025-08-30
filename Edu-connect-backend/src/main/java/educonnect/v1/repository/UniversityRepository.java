package educonnect.v1.repository;

import educonnect.v1.dto.UniversityStatus;
import educonnect.v1.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniversityRepository extends JpaRepository<University, Integer> {
    @Query("SELECT u FROM University u WHERE u.universityStatus = :universityStatus")
    List<University> findUniversitiesByUniversityStatus(@Param("universityStatus") UniversityStatus universityStatus);
    @Query("SELECT u FROM University u WHERE u.universityStatus != :universityStatus")
    List<University> findUniversitiesByNotUniversityStatus(@Param("universityStatus") UniversityStatus universityStatus);
}
