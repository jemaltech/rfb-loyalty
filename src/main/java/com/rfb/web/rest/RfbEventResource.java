package com.rfb.web.rest;

import com.rfb.service.RfbEventService;
import com.rfb.web.rest.errors.BadRequestAlertException;
import com.rfb.service.dto.RfbEventDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.rfb.domain.RfbEvent}.
 */
@RestController
@RequestMapping("/api")
public class RfbEventResource {

    private final Logger log = LoggerFactory.getLogger(RfbEventResource.class);

    private static final String ENTITY_NAME = "rfbEvent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RfbEventService rfbEventService;

    public RfbEventResource(RfbEventService rfbEventService) {
        this.rfbEventService = rfbEventService;
    }

    /**
     * {@code POST  /rfb-events} : Create a new rfbEvent.
     *
     * @param rfbEventDTO the rfbEventDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rfbEventDTO, or with status {@code 400 (Bad Request)} if the rfbEvent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rfb-events")
    public ResponseEntity<RfbEventDTO> createRfbEvent(@RequestBody RfbEventDTO rfbEventDTO) throws URISyntaxException {
        log.debug("REST request to save RfbEvent : {}", rfbEventDTO);
        if (rfbEventDTO.getId() != null) {
            throw new BadRequestAlertException("A new rfbEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RfbEventDTO result = rfbEventService.save(rfbEventDTO);
        return ResponseEntity.created(new URI("/api/rfb-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rfb-events} : Updates an existing rfbEvent.
     *
     * @param rfbEventDTO the rfbEventDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rfbEventDTO,
     * or with status {@code 400 (Bad Request)} if the rfbEventDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rfbEventDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rfb-events")
    public ResponseEntity<RfbEventDTO> updateRfbEvent(@RequestBody RfbEventDTO rfbEventDTO) throws URISyntaxException {
        log.debug("REST request to update RfbEvent : {}", rfbEventDTO);
        if (rfbEventDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RfbEventDTO result = rfbEventService.save(rfbEventDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rfbEventDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rfb-events} : get all the rfbEvents.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rfbEvents in body.
     */
    @GetMapping("/rfb-events")
    public ResponseEntity<List<RfbEventDTO>> getAllRfbEvents(Pageable pageable) {
        log.debug("REST request to get a page of RfbEvents");
        Page<RfbEventDTO> page = rfbEventService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /rfb-events/:id} : get the "id" rfbEvent.
     *
     * @param id the id of the rfbEventDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rfbEventDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rfb-events/{id}")
    public ResponseEntity<RfbEventDTO> getRfbEvent(@PathVariable Long id) {
        log.debug("REST request to get RfbEvent : {}", id);
        Optional<RfbEventDTO> rfbEventDTO = rfbEventService.findOne(id);
        return ResponseUtil.wrapOrNotFound(rfbEventDTO);
    }

    /**
     * {@code DELETE  /rfb-events/:id} : delete the "id" rfbEvent.
     *
     * @param id the id of the rfbEventDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rfb-events/{id}")
    public ResponseEntity<Void> deleteRfbEvent(@PathVariable Long id) {
        log.debug("REST request to delete RfbEvent : {}", id);
        rfbEventService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
