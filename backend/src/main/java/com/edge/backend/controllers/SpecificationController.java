package com.edge.backend.controllers;

import com.edge.backend.models.specification.Specification;
import com.edge.backend.payload.response.SpecificationModels;
import com.edge.backend.services.SpecificationService;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/specifications")
@RequiredArgsConstructor
@Slf4j
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SpecificationController {
    private final SpecificationService specificationService;

    /**
     *
     * By parameters find all available model specifications such as motor size, power, .. etc
     * @return - specification lits
     * @throws ParseException
     */
    @GetMapping()
    List<Specification> specifications(@RequestParam String brand, @RequestParam String model, @RequestParam Integer year, @RequestParam Integer month) throws ParseException {

        Date produced = null;
        if (year != null && month != null) {
            YearMonth yearMonth = YearMonth.of(year, month+1);
            LocalDate firstDayOfMonth = yearMonth.atDay(1);
            ZoneId zoneId = ZoneId.of("UTC");
            ZonedDateTime timestamp = firstDayOfMonth.atStartOfDay(zoneId);
            Instant instant = timestamp.toInstant();
            produced = Date.from(instant);

        }

        if (produced == null || year == null || month == null)
            return new ArrayList<>();

        return specificationService.specifications(brand,model,produced);
    }

    /**
     * return all know brands and their models in database
     * @return
     */
    @GetMapping("/models")
    List<SpecificationModels> specificationModels() {
        return specificationService.specificationModels();
    }

}
