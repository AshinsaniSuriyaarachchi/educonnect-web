package educonnect.v1.repository;

import educonnect.v1.dto.CourseStatus;
import educonnect.v1.entity.Course;
import educonnect.v1.entity.University;
import educonnect.v1.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
    List<Course> findByUniversity(University university);

    @Query("SELECT c FROM Course c WHERE c.isDeleted != 'Y' AND c.courseStatus = :courseStatus")
    List<Course> findCourseByIsDeleted(@Param("courseStatus") CourseStatus courseStatus);

    @Query("SELECT c FROM Course c WHERE c.isDeleted != 'Y' AND c.courseStatus = :courseStatus")
    List<Course> findCourseByIsNotApproved(@Param("courseStatus") CourseStatus courseStatus);

    @Query("SELECT c FROM Course c WHERE c.university.user = :user AND c.isDeleted != 'Y'")
    List<Course> findCoursesByUser(@Param("user") User user);

}
