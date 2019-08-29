package com.rfb.web.rest;

import com.rfb.service.RfbLocationService;
import com.rfb.web.rest.errors.BadRequestAlertException;
import com.rfb.service.dto.RfbLocationDTO;

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
 * REST controller for managing {@link com.rfb.domain.RfbLocation}.
 */
@RestController
@RequestMapping("/api")
public class RfbLocationResource {

    private final Logger log = LoggerFactory.getLogger(RfbLocationResource.class);

    private static final String ENTITY_NAME = "rfbLocation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RfbLocationService rfbLocationService;

    public RfbLocationResource(RfbLocationService rfbLocationService) {
        this.rfbLocationService = rfbLocationService;
    }

    /**
     * {@code POST  /rfb-locations} : Create a new rfbLocation.
     *
     * @param rfbLocationDTO the rfbLocationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rfbLocationDTO, or with status {@code 400 (Bad Request)} if the rfbLocation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rfb-locations")
    public ResponseEntity<RfbLocationDTO> createRfbLocation(@RequestBody RfbLocationDTO rfbLocationDTO) throws URISyntaxException {
        log.debug("REST request to save RfbLocation : {}", rfbLocationDTO);
        if (rfbLocationDTO.getId() != null) {
            throw new BadRequestAlertException("A new rfbLocation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RfbLocationDTO result = rfbLocationService.save(rfbLocationDTO);
        return ResponseEntity.created(new URI("/api/rfb-locations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rfb-locations} : Updates an existing rfbLocation.
     *
     * @param rfbLocationDTO the rfbLocationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rfbLocationDTO,
     * or with status {@code 400 (Bad Request)} if the rfbLocationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rfbLocationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rfb-locations")
    public ResponseEntity<RfbLocationDTO> updateRfbLocation(@RequestBody RfbLocationDTO rfbLocationDTO) throws URISyntaxException {
        log.debug("REST request to update RfbLocation : {}", rfbLocationDTO);
        if (rfbLocationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RfbLocationDTO result = rfbLocationService.save(rfbLocationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rfbLocationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rfb-locations} : get all the rfbLocations.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rfbLocations in body.
     */
    @GetMapping("/rfb-locations")
    public ResponseEntity<List<RfbLocationDTO>> getAllRfbLocations(Pageable pageable) {
        log.debug("REST request to get a page of RfbLocations");
        Page<RfbLocationDTO> page = rfbLocationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /rfb-locations/:id} : get the "id" rfbLocation.
     *
     * @param id the id of the rfbLocationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rfbLocationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rfb-locations/{id}")
    public ResponseEntity<RfbLocationDTO> getRfbLocation(@PathVariable Long id) {
        log.debug("REST request to get RfbLocation : {}", id);
        Optional<RfbLocationDTO> rfbLocationDTO = rfbLocationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(rfbLocationDTO);
    }

    /**
     * {@code DELETE  /rfb-locations/:id} : delete the "id" rfbLocation.
     *
     * @param id the id of the rfbLocationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rfb-locations/{id}")
    public ResponseEntity<Void> deleteRfbLocation(@PathVariable Long id) {
        log.debug("REST request to delete RfbLocation : {}", id);
        rfbLocationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
