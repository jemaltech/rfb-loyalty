package com.rfb.service;

import com.rfb.service.dto.RfbEventAttendanceDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.rfb.domain.RfbEventAttendance}.
 */
public interface RfbEventAttendanceService {

    /**
     * Save a rfbEventAttendance.
     *
     * @param rfbEventAttendanceDTO the entity to save.
     * @return the persisted entity.
     */
    RfbEventAttendanceDTO save(RfbEventAttendanceDTO rfbEventAttendanceDTO);

    /**
     * Get all the rfbEventAttendances.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RfbEventAttendanceDTO> findAll(Pageable pageable);


    /**
     * Get the "id" rfbEventAttendance.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RfbEventAttendanceDTO> findOne(Long id);

    /**
     * Delete the "id" rfbEventAttendance.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
