package com.edge.backend.configurations.converters.endpoins;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;


import java.util.Date;


@Slf4j
@Component
public class StringTimestampToLocalDateTimeConverter implements Converter<String, Date> {

    /**
     * Converts timestamp (as string) into Date
     * @param source - string timestamp
     * @return Date
     */
    @Override
    public Date convert(String source) {

        Date date = null;

        if (NumberUtils.isParsable(source)) {
            Long epochSeconds = NumberUtils.toLong(source);
            date = new Date(epochSeconds);
        }

        return date;
    }
}