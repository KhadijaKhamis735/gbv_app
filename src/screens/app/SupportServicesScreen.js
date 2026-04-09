import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../constants/colors';
import Card from '../../components/Card';
import LoadingIndicator from '../../components/LoadingIndicator';
import { mockSupportServices } from '../../data/mockData';

export default function SupportServicesScreen() {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setServices(mockSupportServices);
      setFilteredServices(mockSupportServices);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(
        services.filter((s) => s.category === selectedCategory)
      );
    }
  }, [selectedCategory, services]);

  const discoveredCategories = [...new Set(services.map((s) => s.category))];
  const orderedBaseCategories = ['all', 'NGO', 'Police', 'Hospital'];
  const categories = [
    ...orderedBaseCategories.filter(
      (cat) => cat === 'all' || discoveredCategories.includes(cat)
    ),
    ...discoveredCategories.filter((cat) => !orderedBaseCategories.includes(cat)),
  ];

  const localizedCategory = (cat) => {
    if (cat === 'all') return t('supportServices.all');
    if (cat === 'Police') return t('supportServices.police');
    if (cat === 'Hospital') return t('supportServices.hospital');
    if (cat === 'NGO') return t('supportServices.ngo');
    return cat;
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const getLocalizedService = (item) => ({
    ...item,
    name: t(`supportServices.items.${item.id}.name`, { defaultValue: item.name }),
    description: t(`supportServices.items.${item.id}.description`, { defaultValue: item.description }),
    address: t(`supportServices.items.${item.id}.address`, { defaultValue: item.location.address }),
    hours: t(`supportServices.items.${item.id}.hours`, { defaultValue: item.hours }),
  });

  const renderService = ({ item }) => {
    const service = getLocalizedService(item);

    return (
    <Card style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <View>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.serviceCategory}>{localizedCategory(service.category)}</Text>
        </View>
        <View
          style={[
            styles.categoryBadge,
            {
              backgroundColor:
                item.category === 'Police'
                  ? colors.primary + '20'
                  : item.category === 'Hospital'
                  ? colors.danger + '20'
                  : colors.success + '20',
            },
          ]}
        >
          <Text
            style={[
              styles.categoryBadgeText,
              {
                color:
                  item.category === 'Police'
                    ? colors.primary
                    : item.category === 'Hospital'
                    ? colors.danger
                    : colors.success,
              },
            ]}
          >
            {localizedCategory(service.category).charAt(0)}
          </Text>
        </View>
      </View>

      <Text style={styles.serviceDescription}>{service.description}</Text>

      <View style={styles.serviceMeta}>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={16}
            color={colors.gray}
          />
          <Text style={styles.metaText}>{service.hours}</Text>
        </View>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={16}
            color={colors.gray}
          />
          <Text style={styles.metaText}>{service.address}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.callButton}
        onPress={() => handleCall(item.phone)}
      >
        <MaterialCommunityIcons
          name="phone"
          size={18}
          color={colors.white}
        />
        <Text style={styles.callButtonText}>{t('supportServices.call')}: {item.phone}</Text>
      </TouchableOpacity>
    </Card>
  );
  };

  if (loading) {
    return <LoadingIndicator message={t('supportServices.loading')} />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('drawer.supportServices')}</Text>
        <Text style={styles.headerSubtitle}>
          {t('supportServices.subtitle')}
        </Text>
      </View>

      {/* Category Filter */}
      <View style={styles.categoriesFilterWrap}>
        <View style={styles.categoriesContainer}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                index !== categories.length - 1 && styles.categoryButtonSpacing,
                selectedCategory === cat && styles.activeCategoryButton,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.categoryButtonText,
                  selectedCategory === cat && styles.activeCategoryButtonText,
                ]}
              >
                {localizedCategory(cat)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Services List */}
      <FlatList
        data={filteredServices}
        renderItem={renderService}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.servicesList}
        scrollEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.dark,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  categoriesFilterWrap: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  categoryButton: {
    flex: 1,
    height: 40,
    paddingHorizontal: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonSpacing: {
    marginRight: spacing.sm,
  },
  activeCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: fontSize.sm,
    color: colors.gray,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeCategoryButtonText: {
    color: colors.white,
  },
  servicesList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  serviceCard: {
    marginBottom: spacing.md,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  serviceName: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.dark,
  },
  serviceCategory: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  categoryBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadgeText: {
    fontWeight: '700',
    fontSize: fontSize.base,
  },
  serviceDescription: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginBottom: spacing.md,
    lineHeight: 18,
  },
  serviceMeta: {
    marginBottom: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  metaText: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginLeft: spacing.sm,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  callButtonText: {
    color: colors.white,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
});
