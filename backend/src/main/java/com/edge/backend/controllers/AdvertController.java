package com.edge.backend.controllers;

import com.edge.backend.exception.groups.OnCreate;
import com.edge.backend.exception.groups.OnPublish;
import com.edge.backend.exception.groups.OnUpdate;
import com.edge.backend.models.advert.Advert;
import com.edge.backend.services.AdvertService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.InvalidPropertiesFormatException;
import java.util.List;

@RestController
@RequestMapping("/api/advert")
@AllArgsConstructor
@Slf4j
@Validated
public class AdvertController {

    private AdvertService advertService;

    @GetMapping("/{id}")
    public Advert getById(@PathVariable String id) {
        return advertService.getById(id);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Advert> getAll(HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        return advertService.findAllByUserId(userId);
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @Validated(OnCreate.class)
    public Advert create(@Valid @RequestBody Advert advert, HttpServletRequest request) {

        String userId = (String) request.getAttribute("userId");
        advert.setUserId(userId);

        String account = (String) request.getAttribute("account");
        advert.getContactInfo().getContact().setAccountType(account);

        return advertService.create(advert);
    }

    @PostMapping("/update")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @Validated(OnUpdate.class)
    public Advert update(@Valid @RequestBody  Advert advert, HttpServletRequest request) throws InvalidPropertiesFormatException {

        String userId = (String) request.getAttribute("userId");
        advert.setUserId(userId);

        return advertService.update(advert);
    }

    /**
     * makes advert available for search
     */
    @PostMapping("/publish")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @Validated(OnPublish.class)
    public Advert publish(@Valid @RequestBody  Advert advert, HttpServletRequest request) throws InvalidPropertiesFormatException {

        String userId = (String) request.getAttribute("userId");
        advert.setUserId(userId);
        advert.setUserId(userId);

        return advertService.publish(advert);
    }

    /**
     * makes advert unavailable for search
     */
    @PostMapping("/unpublish")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Advert unpublish(@Valid @NotBlank @RequestBody String advertId, HttpServletRequest request) throws InvalidPropertiesFormatException {

        String userId = (String) request.getAttribute("userId");
        return advertService.unpublish(advertId, userId);
    }



    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Advert delete(@PathVariable String id, HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        return advertService.delete(userId, id);
    }



    @GetMapping("/search")
    public Page<Advert> searchAdvert(@RequestParam(required = false) String brand,
                                       @RequestParam(required = false) String model,
                                       @RequestParam(required = false) String fuel,
                                       @RequestParam(required = false) Date yearFrom,
                                       @RequestParam(required = false) Date yearTill,
                                       @RequestParam(required = false) Integer priceFrom,
                                       @RequestParam(required = false) Integer priceTill,
                                       @RequestParam(required = false) Long mileageFrom,
                                       @RequestParam(required = false) Long mileageTill,
                                       @RequestParam(required = false) String country,
                                       @RequestParam(required = false) Double longitude,
                                       @RequestParam(required = false) Double latitude,
                                       @RequestParam(required = false) Integer distance,



                                       @RequestParam(defaultValue = "0") Integer page,
                                       // put validation
                                       @RequestParam(defaultValue = "3") Integer size,

                                       @RequestParam(required = false) Sort.Direction sortDirection,
                                       @RequestParam(required = false) String sortField


                                       ) {

        Sort sort = Sort.unsorted();
        if (sortDirection != null && sortField != null)  sort = Sort.by(sortDirection, sortField);
        Pageable pageable = PageRequest.of(page,size, sort);

        return advertService.search(brand,model,fuel,yearFrom,yearTill,priceFrom,priceTill, mileageFrom, mileageTill,longitude,latitude, distance, country, pageable);
    }





}

