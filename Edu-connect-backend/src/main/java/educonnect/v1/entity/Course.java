package educonnect.v1.entity;

import educonnect.v1.dto.CourseStatus;
import educonnect.v1.dto.DegreeType;
import educonnect.v1.dto.Faculty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;

    private String degreeName;  // Changed from courseName to degreeName
    private String link;

    @Enumerated(EnumType.STRING)
    private Faculty faculty;

    @Enumerated(EnumType.STRING)
    private DegreeType degreeType;

    private String type;
    private String duration;
    private String fee;
    private String entryQualification;
    private String description;
    private String isDeleted;
    private CourseStatus courseStatus;
    @ManyToOne
    @JoinColumn(name = "university_id")
    private University university;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
