package com.rfb.web.rest;

import com.rfb.service.RfbUserService;
import com.rfb.web.rest.errors.BadRequestAlertException;
import com.rfb.service.dto.RfbUserDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.rfb.domain.RfbUser}.
 */
@RestController
@RequestMapping("/api")
public class RfbUserResource {

    private final Logger log = LoggerFactory.getLogger(RfbUserResource.class);

    private static final String ENTITY_NAME = "rfbUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RfbUserService rfbUserService;

    public RfbUserResource(RfbUserService rfbUserService) {
        this.rfbUserService = rfbUserService;
    }

    /**
     * {@code POST  /rfb-users} : Create a new rfbUser.
     *
     * @param rfbUserDTO the rfbUserDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rfbUserDTO, or with status {@code 400 (Bad Request)} if the rfbUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rfb-users")
    public ResponseEntity<RfbUserDTO> createRfbUser(@RequestBody RfbUserDTO rfbUserDTO) throws URISyntaxException {
        log.debug("REST request to save RfbUser : {}", rfbUserDTO);
        if (rfbUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new rfbUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RfbUserDTO result = rfbUserService.save(rfbUserDTO);
        return ResponseEntity.created(new URI("/api/rfb-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rfb-users} : Updates an existing rfbUser.
     *
     * @param rfbUserDTO the rfbUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rfbUserDTO,
     * or with status {@code 400 (Bad Request)} if the rfbUserDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rfbUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rfb-users")
    public ResponseEntity<RfbUserDTO> updateRfbUser(@RequestBody RfbUserDTO rfbUserDTO) throws URISyntaxException {
        log.debug("REST request to update RfbUser : {}", rfbUserDTO);
        if (rfbUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RfbUserDTO result = rfbUserService.save(rfbUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rfbUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rfb-users} : get all the rfbUsers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rfbUsers in body.
     */
    @GetMapping("/rfb-users")
    public List<RfbUserDTO> getAllRfbUsers() {
        log.debug("REST request to get all RfbUsers");
        return rfbUserService.findAll();
    }

    /**
     * {@code GET  /rfb-users/:id} : get the "id" rfbUser.
     *
     * @param id the id of the rfbUserDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rfbUserDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rfb-users/{id}")
    public ResponseEntity<RfbUserDTO> getRfbUser(@PathVariable Long id) {
        log.debug("REST request to get RfbUser : {}", id);
        Optional<RfbUserDTO> rfbUserDTO = rfbUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(rfbUserDTO);
    }

    /**
     * {@code DELETE  /rfb-users/:id} : delete the "id" rfbUser.
     *
     * @param id the id of the rfbUserDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rfb-users/{id}")
    public ResponseEntity<Void> deleteRfbUser(@PathVariable Long id) {
        log.debug("REST request to delete RfbUser : {}", id);
        rfbUserService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
